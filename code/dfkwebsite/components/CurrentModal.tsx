import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Modal from "./Modal";
import AddButton from "./AddButton";
import { TeamFront } from "../types/team";
import TeamSpelers from "./TeamSpelers";
import {
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
} from "../modules/overzicht";
import { PlayerFront } from "../types/player";
import { ClubFront } from "../types/club";
import { set } from "lodash";

type CurrentModalData = {
  currentObject: any;
  title: string | undefined;
  currentModalOpen: boolean;
  setCurrentModal: Function;
  children?: (item: any) => JSX.Element;
  addTeams?: boolean;
  ShowTeamModalOpen?: boolean;
  setShowTeamModalOpen?: Dispatch<SetStateAction<boolean>>;
};

const CurrentModal: FunctionComponent<CurrentModalData> = ({
  currentObject,
  title,
  currentModalOpen,
  setCurrentModal,
  children,
  addTeams,
  ShowTeamModalOpen,
  setShowTeamModalOpen,
}) => {
  const [teams, setTeams] = useState<TeamFront[]>([]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API && currentObject) {
      let localTeams: TeamFront[] = [];
      setTeams([]);
      if (currentObject.teamID) {
        localTeams.push(currentObject);
        setTeams(localTeams);
      } else if (currentObject.clubID) {
        fetch(`/api/clubs/${currentObject.clubID}`)
          .then((response) => response.json())
          .then((parsedTeam) => parsedTeam.teams)
          .catch((err) => console.log(err))

          .then((teams) => {
            localTeams = teams.flat();
            setTeams(localTeams);
          });
      } else if (currentObject.playerID) {
        fetch(`/api/players/${currentObject.playerID}`)
          .then((response) => response.json())
          .then((parsedTeam) => parsedTeam.teams)
          .catch((err) => console.log(err))

          .then((teams) => {
            localTeams = teams.flat();
            setTeams(localTeams);
          });
      }
    }
  }, [currentObject]);

  return (
    currentObject && (
      <Modal
        title={title}
        modalOpen={currentModalOpen}
        setModalOpen={setCurrentModal}
      >
        {children ? children(currentObject) : null}
        {addTeams && (
          <div className="mt-10 w-1/2">
            <AddButton
              name="Team toevoegen"
              addModalOpen={ShowTeamModalOpen}
              setAddModalOpen={setShowTeamModalOpen}
            />
          </div>
        )}
        {teams.length > 0 ? (
          teams.map((team) => {
            return (
              <TeamSpelers
                team={team}
                key={team.teamID}
                handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
                handleMakePlayerCaptain={handleMakePlayerCaptain}
              />
            );
          })
        ) : (
          <p className="text-xl mt-10">{addTeams && "Geen teams gevonden."}</p>
        )}
      </Modal>
    )
  );
};

export default CurrentModal;
