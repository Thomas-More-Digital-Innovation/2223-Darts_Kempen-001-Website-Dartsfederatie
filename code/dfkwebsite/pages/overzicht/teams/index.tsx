import { useEffect, useState } from "react";
import { NextPage } from "next";
import * as dummyData from "../../../data";
import OverzichtTopBar from "../../../components/OverzichtTopBar";
import ShowTeamModal from "../../../components/ShowTeamModal";
import TeamCard from "../../../components/TeamCard";
import { TeamFront } from "../../../types/team";
import SearchableCardGrid from "../../../components/SearchableCardGrid";
import CurrentModal from "../../../components/CurrentModal";
import Head from "next/head";

const Teams: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [teams, setTeams] = useState<TeamFront[]>(dummyData.teams);
  const [currentTeam, setCurrentTeam] = useState<TeamFront | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_NO_API) {
      fetch(`/api/teams`)
        .then((teams) => teams.json())
        .then((parsedTeams) => setTeams(parsedTeams))
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div>
      <Head>
        <title>DFK | Teams</title>
        <meta name="description" content="DFK teams" />
      </Head>
      {/* Show Team Modal */}
      <ShowTeamModal
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
        teams={teams}
        setTeams={setTeams}
      />

      {/* Page title, add team button and search field */}
      <OverzichtTopBar
        titleName="Teams"
        setSearch={setSearch}
        addButtonName="Team toevoegen"
        addModalOpen={addModalOpen}
        setAddModalOpen={setAddModalOpen}
      />

      {/* Modal for team details when you press team button */}
      {currentTeam && (
        <CurrentModal
          currentObject={currentTeam}
          title={currentTeam?.name}
          currentModalOpen={isOpen}
          setCurrentModal={setIsOpen}
        />
      )}

      {/* Grid with all teams */}
      <SearchableCardGrid items={teams} search={search}>
        {(team: TeamFront) => {
          return (
            <TeamCard
              teamData={team}
              setCurrentTeam={setCurrentTeam}
              setIsOpen={setIsOpen}
            />
          );
        }}
      </SearchableCardGrid>
    </div>
  );
};

export default Teams;
