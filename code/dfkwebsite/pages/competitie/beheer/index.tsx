import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import Modal from "../../../components/Modal";
import DefaultInput from "../../../components/DefaultInput";
import {
  CLASSIFICATION,
  COMPETITION_TYPE,
  Competition,
} from "../../../types/competition";
import * as formHandler from "../../../modules/formHandler";
import { useRouter } from "next/router";
import { SelectOption, countFridays } from "../../../modules/general";
import { competitionRegexPatterns } from "../../../modules/competition";
import * as dummyData from "../../../data";
import DataTable from "react-data-table-component";
import { Icon } from "@iconify/react";
import InformationBox from "../../../components/InformationBox";
import DefaultSelect from "../../../components/DefaultSelect";
import AddButton from "../../../components/AddButton";

interface TableData {
  team1: string;
  team2: string;
}

export type columnType = {
  name: string;
  sortable?: boolean;
  filterable?: boolean;
  grow?: number;
};

interface competitionColumnType extends columnType {
  selector: (row: Competition) => any;
}

const Clubs: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [amountTeams, setAmountTeams] = useState<number>(0);
  const [tableData, setTableData] = useState<TableData[][]>([]);

  const [competitions, setCompetitions] = useState<Competition[]>(
    dummyData.competitions
  );

  const [activeCompetitions, setActiveCompetitions] = useState<SelectOption[]>(
    []
  );

  const handleActiveCompetitionsSubmit = async () => {
    const activeCompetitionsIDs = activeCompetitions.map(
      (competition) => competition.value
    );

    let data = new FormData();
    data.append("competitionsID", JSON.stringify(activeCompetitionsIDs));
    await fetch("/api/competition/current", {
      method: "PUT",
      body: data,
    });
  };

  const handleAmountTeamsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const teamCount = parseInt(value, 10);
    setAmountTeams(teamCount);

    const newData: TableData[][] = [];
    for (let i = 0; i < teamCount; i++) {
      const row: TableData[] = [];
      for (let j = 0; j < teamCount; j++) {
        row.push({ team1: "", team2: "" });
      }
      newData.push(row);
    }
    setTableData(newData);
  };

  const handleTableDataChange = (
    e: ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    columnIndex: number,
    field: "team1" | "team2"
  ): void => {
    const { value } = e.target;
    const newData = [...tableData];
    newData[rowIndex][columnIndex] = {
      ...newData[rowIndex][columnIndex],
      [field]: value,
    };
    console.log(newData);
    setTableData(newData);
  };

  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    classification: "",
    startdate: "",
    enddate: "",
    type: "",
  });

  const handleChange = (event: any) => {
    formHandler.handleChange(
      event,
      setFormValues,
      formValues,
      setHandledChange
    );
  };

  const goToPlayDays = (competitionID: string) => {
    router
      .push({
        pathname: "/competitie/beheer/playdays",
        query: {
          competitionID: competitionID,
          // Passing extra variables if the API is disabled
          ...(process.env.NEXT_PUBLIC_NO_API == "1" && {
            query: true,
            startDate: formValues.startdate,
            endDate: formValues.enddate,
            amountTeams: formValues.amountteams,
            classification: formValues.classification,
            type: formValues.type,
          }),
        },
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (event: any) => {
    console.log(formValues);

    let competition: Competition | null = await formHandler.handleSubmit(
      event,
      formValues,
      competitionRegexPatterns,
      "/api/competition",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      competitions[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!competition) {
      return;
    }

    setInformationBoxMessage(
      "Competitie succesvol aangemaakt, je wordt binnen 5 seconden doorgestuurd naar de speeldagen pagina."
    );
    setTimeout(() => {
      if (!competition) return;

      goToPlayDays(competition.competitionID);
    }, 5000);
  };

  let competitionCount = 0;

  const columns: Array<competitionColumnType> = [
    {
      name: "ID",
      selector: (row) => {
        competitionCount++;
        return competitionCount;
      },
      sortable: true,
      filterable: true,
    },
    {
      name: "Start datum",
      selector: (row) =>
        new Date(row.startDate).toLocaleDateString("nl-BE", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Classificatie",
      selector: (row) => row.classification,
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Aantal teams",
      selector: (row) => row.teamAmount || 0,
      sortable: true,
      filterable: true,
      grow: 2,
    },
    {
      name: "Acties",
      selector: (row) => (
        <div className="flex gap-3 flex-nowrap">
          <Icon
            className="cursor-pointer text-2xl"
            onClick={() => onClickDelete(row.competitionID)}
            icon="mdi:delete"
          />
          <Icon
            className="cursor-pointer text-2xl"
            onClick={() => goToPlayDays(row.competitionID)}
            icon="mdi:play"
          />
        </div>
      ),
      grow: 1,
    },
  ];

  const onClickDelete = async (id: string) => {
    if (!window.confirm("Ben je zeker dat je deze competitie wil verwijderen?"))
      return;
    if (process.env.NEXT_PUBLIC_NO_API) {
      setCompetitions(
        competitions.filter((competition) => competition.competitionID != id)
      );
      return;
    }

    await fetch(`/api/competition/${id}`, { method: "DELETE" }).then(
      (response) => {
        if (response.status != 200)
          throw new Error("Competition not deleted correctly");
        setCompetitions(
          competitions.filter((competition) => competition.competitionID != id)
        );
      }
    );
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/competition`)
        .then((competitions) => competitions.json())
        .then((parsedCompetitions) => setCompetitions(parsedCompetitions))
        .catch((err) => console.log(err));

      fetch(`/api/competition/current`)
        .then((currentCompetitions) => currentCompetitions.json())
        .then((parsedCurrentCompetitions: Competition[]) => {
          setActiveCompetitions(
            parsedCurrentCompetitions.map((competition) => {
              return {
                label: `${competition.type} ${
                  competition.classification
                } ${new Date(competition.startDate).toLocaleDateString(
                  "nl-BE",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }
                )}`,
                value: competition.competitionID,
              };
            })
          );
        })

        .catch((err) => console.log(err));
    }
  }, []);

  const handleSelectChange = (
    value: { value: string; label: string }[],
    action: { action: string; name: string }
  ) => {
    formHandler.handleChangeSelect(value, action, setFormValues, formValues);
  };

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [handledChange, setHandledChange] = useState(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  return (
    <div>
      <Modal
        title="Competitie toevoegen"
        modalOpen={addModalOpen}
        setModalOpen={setAddModalOpen}
      >
        <InformationBox
          success={handleSubmitSuccess}
          show={informationBoxMessage !== ""}
          onClose={() => setInformationBoxMessage("")}
        >
          {informationBoxMessage}
        </InformationBox>
        <div>
          <div className="flex flex-row gap-2 children:w-full">
            <DefaultInput
              name="startdate"
              label="Start datum"
              type="date"
              value={formValues.startdate}
              onChange={handleChange}
            />
            <DefaultInput
              name="enddate"
              label="Eind datum"
              type="date"
              value={formValues.enddate}
              onChange={handleChange}
            />
          </div>

          {formValues.enddate && formValues.startdate && (
            <p className="max-w-sm pt-2">
              De door jouw ingegeven datums zullen ervoor zorgen dat er{" "}
              <span className="font-bold">
                {countFridays(
                  new Date(formValues.startdate),
                  new Date(formValues.enddate)
                )}
              </span>{" "}
              speeldagen worden gegenereerd.
            </p>
          )}

          <DefaultInput
            name="teamAmount"
            label="Aantal teams"
            type="number"
            value={formValues.teamAmount}
            onChange={handleChange}
          />

          <div className="flex flex-col">
            <DefaultSelect
              name="classification"
              id="classification"
              label="Classificaties"
              multiple
              search
              onSelectChange={handleSelectChange}
              options={Object.values(CLASSIFICATION).map((value) => {
                return {
                  value: value,
                  label: `${value[0].toUpperCase()}${value
                    .substring(1)
                    .toLowerCase()}`,
                };
              })}
            />
          </div>

          <div className="flex flex-col">
            <DefaultSelect
              name="type"
              id="type"
              label="Type"
              value={formValues.type}
              onChange={handleChange}
              options={Object.values(COMPETITION_TYPE).map((value) => {
                return {
                  value: value,
                  label: `${value[0].toUpperCase()}${value
                    .substring(1)
                    .toLowerCase()}`,
                };
              })}
            />
          </div>

          <button
            type="submit"
            className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
            onClick={handleSubmit}
            disabled={!handledChange}
          >
            Aanmaken
          </button>
        </div>
      </Modal>
      <OverzichtTopBar
        titleName="Beheer Competities"
        setSearch={setSearch}
        addButtonName="Competition toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <DataTable
        title="Projecten"
        columns={columns}
        data={competitions}
        pagination
      />

      <div className="flex flex-row gap-3">
        <DefaultSelect
          name="activeCompetitions"
          id="activeCompetitions"
          label="Actieve competities"
          multiple
          search
          value={activeCompetitions}
          onSelectChange={(selectedOptions, action) => {
            setActiveCompetitions(selectedOptions);
          }}
          options={competitions.map((competition) => {
            return {
              value: competition.competitionID,
              label: `${competition.type} ${
                competition.classification
              } ${new Date(competition.startDate).toLocaleDateString("nl-BE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}`,
            };
          })}
        />

        <button
          type="submit"
          className="bg-[#0A893D] text-white rounded-lg p-3 mt-10"
          onClick={handleActiveCompetitionsSubmit}
        >
          Aanmaken
        </button>
      </div>
    </div>
  );
};

export default Clubs;
