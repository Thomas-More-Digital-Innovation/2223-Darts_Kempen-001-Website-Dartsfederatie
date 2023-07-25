import { Dispatch, FunctionComponent, useEffect, useState } from "react";
import Modal from "./Modal";
import { CLASSIFICATION } from "../types/competition";
import DefaultInput from "./DefaultInput";
import DefaultSelect from "./DefaultSelect";
import { ClubFront } from "../types/club";
import InformationBox from "./InformationBox";
import * as dummyData from "../data";
import * as formHandler from "../modules/formHandler";
import { Team, TeamFront } from "../types/team";
import { getTeams, teamRegexPatterns } from "../modules/team";
import { PlayerFront } from "../types/player";
import { SelectOption } from "../modules/general";
import { getClubs } from "../modules/club";
import { getPlayers } from "../modules/player";
import SubmitButton from "./SubmitButton";

type ShowTeamModalData = {
  addModalOpen: boolean;
  setAddModalOpen: any;
  currentClub?: ClubFront | null;
  currentPlayer?: PlayerFront | null;
  showTeamList?: boolean;
  teams?: TeamFront[];
  setTeams?: Dispatch<React.SetStateAction<TeamFront[]>>;
};

const ShowTeamModal: FunctionComponent<ShowTeamModalData> = (
  props: ShowTeamModalData
) => {
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    name: "",
    captainID: "",
    classification: "",
    clubID: "",
    playerIDs: "",
  });

  const [handleSubmitSuccess, setHandleSubmitSuccess] = useState<
    boolean | null
  >(false);
  const [informationBoxMessage, setInformationBoxMessage] = useState("");

  const handleChange = (event: any) => {
    formHandler.handleChange(event, setFormValues, formValues);
  };

  const handleSelectChange = (
    value: { value: string; label: string }[],
    action: { action: string; name: string }
  ) => {
    formHandler.handleChangeSelect(value, action, setFormValues, formValues);
  };

  const handleSubmit = async (event: any) => {
    let team: Team | null = await formHandler.handleSubmit(
      event,
      formValues,
      teamRegexPatterns,
      "/api/teams",
      setInformationBoxMessage,
      setHandleSubmitSuccess,
      dummyData.teams[0],
      process.env.NEXT_PUBLIC_NO_API == "1" ? true : false
    );

    if (!team) return;

    setInformationBoxMessage(
      "Team succesvol aangemaakt, je wordt binnen 5 seconden terug gestuurd naar het algemeen overzicht."
    );
    if (!props.setTeams) return;

    props.setTeams((teams) => {
      if (!team) return teams;
      // The new Team will be of type Team, but we want it to be of type TeamFront
      return [...teams, team as TeamFront];
    });

    setTimeout(() => {
      props.setAddModalOpen(false);
      setInformationBoxMessage("")
    }, 5000);
  };

  const [clubs, setClubs] = useState<SelectOption[]>([
    { value: dummyData.club[0].clubID, label: dummyData.club[0].name },
  ]);
  const [teams, setTeams] = useState<SelectOption[]>([
    { value: dummyData.teams[0].teamID, label: dummyData.teams[0].name },
  ]);
  const [players, setPlayers] = useState<SelectOption[]>([
    {
      value: dummyData.players[0].playerID,
      label:
        dummyData.players[0].firstName + " " + dummyData.players[0].lastName,
    },
  ]);

  useEffect(() => {
    getClubs()
      .then((clubs) => setClubs(clubs))
      .catch((err) => console.log(err));

    getTeams()
      .then((teams) => setTeams(teams))
      .catch((err) => console.log(err));

    getPlayers()
      .then((players) => setPlayers(players))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Modal
      title="Team toevoegen"
      modalOpen={props.addModalOpen}
      setModalOpen={props.setAddModalOpen}
    >
      {props.showTeamList ? (
        <div className="mt-10">
          <p>Voeg hieronder een bestaand team toe</p>
          <DefaultSelect
            id="existingTeam"
            name="existingTeam"
            label="Bestaand Team"
            options={teams}
            search={true}
          />{" "}
        </div>
      ) : null}

      <div className="flex flex-col">
        {props.showTeamList ? (
          <p className="mt-5">Of maak een nieuw team</p>
        ) : null}
        <InformationBox
          success={handleSubmitSuccess}
          show={informationBoxMessage !== ""}
          onClose={() => setInformationBoxMessage("")}
        >
          {informationBoxMessage}
        </InformationBox>
        <DefaultInput
          id="teamnaam"
          name="name"
          label="Teamnaam"
          placeholder="Teamnaam"
          value={formValues.name}
          onChange={handleChange}
        />

        <DefaultSelect
          name="classification"
          id="classification"
          label="Gewest"
          options={Object.values(CLASSIFICATION).map((value) => {
            return {
              value: value,
              label: `${value[0].toUpperCase()}${value
                .substring(1)
                .toLowerCase()}`,
            };
          })}
          onSelectChange={handleSelectChange}
          search={true}
        />

        <DefaultSelect
          name="captainID"
          id="captainID"
          label="Kapitein"
          options={players.map((player) => {
            return {
              value: player.value,
              label: player.label,
            };
          })}
          onSelectChange={handleSelectChange}
          search={true}
          notRequired={true}
        />
        
        <div className="flex gap-5">
          <DefaultSelect
            name="clubID"
            id="clubID"
            label="Club"
            options={
              props.currentClub
                ? [
                    {
                      value: props.currentClub.clubID,
                      label: props.currentClub.name,
                    },
                  ]
                : clubs
            }
            onSelectChange={handleSelectChange}
            search={true}
            notRequired={true}
          />

          <DefaultSelect
            name="playerIDs"
            id="playerIDs"
            label="Spelers"
            options={
              props.currentPlayer
                ? [
                    {
                      value: props.currentPlayer.playerID,
                      label: `${props.currentPlayer.firstName} ${props.currentPlayer.lastName}`,
                    },
                  ]
                : players
            }
            onSelectChange={handleSelectChange}
            search={true}
            multiple={true}
            notRequired={true}
          />
        </div>
        <SubmitButton handleSubmit={handleSubmit} />
      </div>
    </Modal>
  );
};

export default ShowTeamModal;
