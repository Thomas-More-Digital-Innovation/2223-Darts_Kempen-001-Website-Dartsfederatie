import { useEffect, useState } from "react";
import { NextPage } from "next";
import Card from "../../../components/Card";
import CardGrid from "../../../components/CardGrid";
import * as dummyData from "../../../data";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import AddTeamModal from "../../../components/AddTeamModal";
import TeamCard from "../../../components/TeamCard";
import TeamSpelers from "../../../components/TeamSpelers";
import { TeamFront } from "../../../types/team";
import Modal from "../../../components/Modal";

const Teams: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [teams, setTeams] = useState<TeamFront[]>(dummyData.teams);
  const [currentTeam, setCurrentTeam] = useState<TeamFront | null>(null);

  const handleDeletePlayerFromTeam = (playerID: string, teamID: string) => {
    // Liefste Bryan, dit is aan u! <3
  };

  const handleMakePlayerCaptain = (playerID: string, teamID: string) => {
    // Liefste Bryan, dit is aan u! <3
  };

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/teams`)
        .then((teams) => teams.json())
        .then((parsedTeams) => setTeams(parsedTeams));
    }
  }, []);
  let results = 0;
  return (
    <div>
      <AddTeamModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />
      <OverzichtTopBar
        titleName="Teams"
        search={search}
        setSearch={setSearch}
        addButtonName="Team"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      {currentTeam && (
        <Modal
          title={currentTeam.name}
          modalOpen={isOpen}
          setModalOpen={setIsOpen}
        >
          <TeamSpelers
            team={currentTeam}
            handleDeletePlayerFromTeam={handleDeletePlayerFromTeam}
            handleMakePlayerCaptain={handleMakePlayerCaptain}
          />
        </Modal>
      )}
      <CardGrid>
        {teams.length === 0 ? (
          <h1 className="text-4xl font-extrabold text-white">
            Geen teams gevonden
          </h1>
        ) : (
          teams
            .filter((team) => {
              if (
                search == "" ||
                team.name.toLowerCase().includes(search.toLowerCase())
              )
                return team;
              results++;
            })
            .map((team) => (
              <Card key={team.name}>
                <TeamCard teamData={team} setIsOpen={setIsOpen} setCurrentTeam={setCurrentTeam} />
              </Card>
            ))
        )}
        {results === teams.length && (
          <h1 className="text-4xl font-extrabold text-white">
            Geen teams gevonden
          </h1>
        )}
      </CardGrid>
    </div>
  );
};

export default Teams;
