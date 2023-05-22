import { FunctionComponent } from "react";
import { TeamFront } from "../types/team";
import { Player } from "../types/player";

export type teamSpelersData = {
  team: TeamFront;
  handleDeletePlayerFromTeam: Function;
  handleMakePlayerCaptain: Function;
  selected?: Player;
};

const TeamSpelers: FunctionComponent<teamSpelersData> = ({
  team,
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
}) => {
  return (
    <div className="mt-10 text-white">
      <div className="flex gap-3 items-center mb-5">
        <input
          type="text"
          className="text-3xl font-semibold bg-inherit placeholder:text-white"
          defaultValue={team.name}
        ></input>
        <button className="bg-edit-button px-4 py-1">Edit</button>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          {team.players ? (
            team.players.map((player) => (
              <div className="flex items-center gap-3" key={player.playerID}>
                <p className="flex-grow">
                  {player.firstName + " " + player.lastName}
                </p>
                <button
                  className="bg-delete-button px-6 py-2 ml-3"
                  onClick={() =>
                    handleDeletePlayerFromTeam(player.playerID, team.teamID)
                  }
                >
                  Verwijder van team
                </button>

                <button
                  className={`${
                    team.captainID == player.playerID
                      ? "opacity-60 cursor-default"
                      : ""
                  } bg-edit-button px-8 py-2`}
                  onClick={() =>
                    handleMakePlayerCaptain(player.playerID, team.teamID)
                  }
                >
                  Maak kapitein
                </button>
              </div>
            ))
          ) : (
            <p>Dit team heeft geen spelers</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSpelers;
