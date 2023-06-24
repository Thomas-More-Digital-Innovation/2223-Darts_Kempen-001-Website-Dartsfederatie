import { ChangeEvent, useEffect, useState } from "react";
import { NextPage } from "next";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import { useRouter } from "next/router";
import {
  SelectOption,
  countFridays,
  getNextFriday,
  getParams,
} from "../../../modules/general";
import { teams, competitions } from "../../../data";
import { Competition } from "../../../types/competition";
import DefaultSelect from "../../../components/DefaultSelect";
import { getTeams } from "../../../modules/team";
import * as dummyData from "../../../data";

export interface TableData {
  team1: string;
  team2: string;
}

function getTeamsSelect() {
  return Array.from({ length: 10 }).map((_, index) => {
    return { label: `Team ${index + 1}`, value: `Team ${index + 1}` };
  });
}

const GeneratePlaydays: NextPage = () => {
  const router = useRouter();
  const { asPath } = router;
  const params = getParams(asPath);

  // const startDate = new Date(params.startDate);
  // const endDate = new Date(params.endDate);

  const [competitionInfo, setCompetitionInfo] = useState<
    Competition | undefined
  >(undefined);

  const [amountTeams, setAmountTeams] = useState<number>(0);

  const [tableData, setTableData] = useState<TableData[][]>([]);

  const handleAmountTeamsChange = (
    competitionInfo: Competition,
    teamAmount?: number
  ): void => {
    const teamCount = teamAmount ?? amountTeams;

    if (!competitionInfo) return;

    const maxRows = countFridays(
      new Date(competitionInfo?.startDate ?? params.startDate ?? 0),
      new Date(competitionInfo?.endDate ?? params.endDate ?? 0)
    );

    const newData: TableData[][] = [];
    for (let i = 0; i < maxRows; i++) {
      const row: TableData[] = [];
      for (let j = 0; j < teamCount; j++) {
        row.push({
          team1: competitionInfo?.playdays?.[i][j].team1 ?? "",
          team2: competitionInfo?.playdays?.[i][j].team2 ?? "",
        });
      }
      newData.push(row);
    }
    setTableData(newData);
    console.log(newData);
  };

  const handleTableDataChange = (
    selectedOption: SelectOption,
    rowIndex: number,
    columnIndex: number,
    field: "team1" | "team2"
  ): void => {
    const { value } = selectedOption;

    let tableD = [...tableData];
    console.log(value);
    tableD[rowIndex][columnIndex][field] = value;

    setTableData(tableD);
    console.log(tableD);
  };

  const [teams, setTeams] = useState(
    dummyData.teams.map((team) => {
      return { label: team.name, value: team.teamID } as SelectOption;
    })
  );

  const [competitionTeams, setCompetitionTeams] = useState<SelectOption[]>([]);

  const tableFilled = (): boolean => {
    if (tableData.some((row) => row.some((cell) => !cell.team1 || !cell.team2)))
      return false;

    return true;
  };

  const handleSubmit = async (e: any) => {
    // Check the table data for empty values and return if there is any empty value by using the most efficient method
    if (!tableFilled()) return;

    let data = new FormData();
    data.append("playdays", JSON.stringify(tableData));
    data.append(
      "teamsID",
      JSON.stringify(competitionTeams.map((teamSelect) => teamSelect.value))
    );
    await fetch(`/api/competition/${params.competitionID}`, {
      method: "PUT",
      body: data,
    });
  };

  useEffect(() => {
    getTeams()
      .then(async (teams) => {
        setTeams(teams);

        let currentCompetition = await fetch(
          `/api/competition/${params.competitionID}`
        )
          .then((competition) => competition.json())
          .then((parsedCompetition: Competition) => {
            setCompetitionInfo(parsedCompetition);
            if (parsedCompetition.playdays)
              setTableData(parsedCompetition.playdays);
            handleAmountTeamsChange(parsedCompetition);
            return parsedCompetition;
          })
          .catch((err) => {
            console.log(err);
            return null;
          });

        if (!currentCompetition) {
          if (params.dummy) {
            currentCompetition = dummyData.competitions[0];
            setCompetitionInfo(currentCompetition);
          } else {
            console.log("No competition by this ID found");
            return;
          }
        }

        if (currentCompetition?.teamsID) {
          console.log("teamsID", currentCompetition.teamsID);
          setCompetitionTeams(
            teams.filter((team) =>
              currentCompetition?.teamsID
                ? currentCompetition.teamsID.includes(team.value)
                : false
            )
          );
          setAmountTeams(currentCompetition?.teamsID.length);
        }

        handleAmountTeamsChange(
          currentCompetition,
          currentCompetition?.teamsID?.length
        );
        console.log("competition teams", competitionTeams);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("competition info", competitionInfo);
  console.log("amount teams", amountTeams);
  console.log("competition teams", competitionTeams);

  return (
    <div>
      <OverzichtTopBar titleName="Speeldagen genereren" />

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: amountTeams }).map((_, index) => (
          <DefaultSelect
            key={`Team ${index + 1}`}
            name={`team${index + 1}`}
            label={`Team ${index + 1}`}
            options={teams}
            search
            notRequired={true}
            value={competitionTeams}
            onSelectChange={(selectedOptions, action) => {
              setCompetitionTeams(selectedOptions);
              setAmountTeams(selectedOptions.length);

              handleAmountTeamsChange(
                competitionInfo as Competition,
                selectedOptions.length
              );

              // console.log(selectedOptions);
              // console.log(teams);
            }}
          />
        ))}
      </div>

      <div
        className="grid children:py-4 gap-2 children:border-b border-t"
        style={{
          gridTemplateRows: `repeat(${
            competitionTeams.length + 1
          }, minmax(0, 1fr))`,
        }}
      >
        {tableData.map((rowData, rowIndex) => (
          <div
            key={rowIndex}
            className="border-b grid"
            style={{
              gridTemplateColumns: `repeat(${
                competitionTeams.length + 1
              }, minmax(0, 1fr))`,
            }}
          >
            <div>
              <p>Speeldag {rowIndex + 1}</p>
              <p>
                {new Date(
                  getNextFriday(
                    new Date(
                      competitionInfo?.startDate ?? params.startDate ?? 0
                    )
                  ).setDate(
                    getNextFriday(
                      new Date(competitionInfo?.endDate ?? params.endDate ?? 0)
                    ).getDate() +
                      7 * rowIndex
                  )
                ).toLocaleDateString("nl-BE", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  weekday: "short",
                })}
              </p>
            </div>
            {rowData.map((data, columnIndex) => (
              <div key={columnIndex} className="flex items-center ">
                <div className="flex flex-col justify-center items-center">
                  <DefaultSelect
                    name={`${rowIndex}-${columnIndex}`}
                    labelEnabled={false}
                    options={getTeamsSelect()}
                    search
                    value={{
                      label: competitionTeams.find(
                        (competitionTeam) =>
                          competitionTeam.value ===
                          tableData[rowIndex][columnIndex].team1
                      )?.label,
                      value: tableData[rowIndex][columnIndex].team1,
                    }}
                    onSelectChange={(
                      selectedOption: SelectOption,
                      action: { action: string; name: string }
                    ) =>
                      handleTableDataChange(
                        selectedOption,
                        rowIndex,
                        columnIndex,
                        "team1"
                      )
                    }
                  />

                  <span>vs</span>
                  <DefaultSelect
                    name={`${rowIndex}-${columnIndex}`}
                    options={getTeamsSelect()}
                    labelEnabled={false}
                    search
                    value={{
                      label: competitionTeams.find(
                        (competitionTeam) =>
                          competitionTeam.value ===
                          tableData[rowIndex][columnIndex].team2
                      )?.label,
                      value: tableData[rowIndex][columnIndex].team2,
                    }}
                    onSelectChange={(
                      selectedOption: SelectOption,
                      action: { action: string; name: string }
                    ) =>
                      handleTableDataChange(
                        selectedOption,
                        rowIndex,
                        columnIndex,
                        "team2"
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex gap-5 items-center text-white mt-10">
        <button
          type="submit"
          className="bg-[#0A893D] rounded-lg p-3"
          onClick={handleSubmit}
          disabled={!tableFilled()}
        >
          Genereer speeldagen
        </button>
        {tableFilled() ? null : (
          <p className="">De tabel is nog niet volledig ingevuld</p>
        )}
      </div>
    </div>
  );
};

export default GeneratePlaydays;
