import { NextPage } from "next";
import { useEffect, useState } from "react";
import AddSpelerModal from "../../../components/AddSpelerModal";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import PlayerCard from "../../../components/PlayerCard";
import { PlayerFront } from "../../../types/player";
import * as dummyData from "../../../data";
import TeamSpelers from "../../../components/TeamSpelers";
import Modal from "../../../components/Modal";
import {
  handleDeletePlayerFromTeam,
  handleMakePlayerCaptain,
} from "../../../modules/overzicht";
import AddButton from "../../../components/AddButton";
import AddTeamModal from "../../../components/AddTeamModal";
import SearchableCardGrid from "../../../components/SearchableCardGrid";
import CurrentModal from "../../../components/CurrentModal";
import { TeamFront } from "../../../types/team";

const Spelers: NextPage = () => {
  const [players, setPlayers] = useState<PlayerFront[]>(dummyData.players);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerFront | null>(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addTeamModalOpen, setAddTeamModalOpen] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/players`)
        .then((players) => players.json())
        .then((parsedPlayers) => setPlayers(parsedPlayers));
    }
  }, []);

  return (
    <div>
      {/* Add Player Modal */}
      <AddSpelerModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        players={players}
        setPlayers={setPlayers}
      />

      {/* Page title, add player button and search field */}
      <OverzichtTopBar
        titleName="Spelers"
        search={search}
        setSearch={setSearch}
        addButtonName="Speler"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      {/* Modal for player details when you press team button */}
      <CurrentModal
        currentObject={currentPlayer}
        title={currentPlayer?.firstName + " " + currentPlayer?.lastName}
        currentModalOpen={isOpen}
        setCurrentModal={setIsOpen}
      >
        {(player) => {
          return (
            <div>
              <input
                className="bg-inherit"
                type="text"
                defaultValue={player.phone}
              ></input>
              <div className="mt-10 w-1/2">
                <AddButton
                  name="Team toevoegen"
                  addModalOpen={addTeamModalOpen}
                  setAddModalOpen={setAddTeamModalOpen}
                />
              </div>
              {player.teams ? (
                player.teams.map((team: TeamFront) => (
                  <TeamSpelers
                    team={team}
                    key={team.teamID}
                    handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
                    handleMakePlayerCaptain={handleMakePlayerCaptain}
                  />
                ))
              ) : (
                <p className="text-xl mt-10">Deze speler heeft geen team.</p>
              )}
            </div>
          );
        }}
      </CurrentModal>

      {/* This is for inside the current modal when adding a team to the player */}
      <AddTeamModal
        addModalOpen={addTeamModalOpen}
        setAddModalOpen={setAddTeamModalOpen}
        showTeamList={true}
        currentPlayer={currentPlayer}
      />

      {/* Grid of all players */}
      <SearchableCardGrid
        items={players}
        search={search}
        filterName="firstName"
      >
        {(player: PlayerFront) => {
          return (
            <PlayerCard
              playerData={player}
              key={player.playerID}
              setCurrentPlayer={setCurrentPlayer}
              setIsOpen={setIsOpen}
            />
          );
        }}
      </SearchableCardGrid>
    </div>
  );
};

export default Spelers;
