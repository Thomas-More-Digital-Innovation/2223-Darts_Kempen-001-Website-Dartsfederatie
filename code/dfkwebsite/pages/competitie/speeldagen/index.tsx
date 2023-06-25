import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Competition } from "../../../types/competition";
import Link from "next/link";

const Speeldagen: NextPage = () => {
  const [activeCompetition, setActiveCompetition] = useState<Competition[]>([]);

  useEffect(() => {
    fetch("/api/competition/current")
      .then((res) => res.json())
      .then((parsedCompetitions: Competition[]) => {
        setActiveCompetition(parsedCompetitions);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1 className="text-6xl font-extrabold text-blacktext dark:text-white mb-5">
        Speeldagen pagina
      </h1>
      {activeCompetition?.length > 0 ? (
        activeCompetition.map((competition) => (
          <div
            className="flex flex-col text-white"
            key={competition.competitionID}
          >
            <h2 key={competition.competitionID} className="text-3xl">
              Competitie
              <span className="text-base">
                ({competition.classification.toLowerCase()}{" "}
                {new Date(competition.startDate).getFullYear()})
              </span>
            </h2>

            {competition?.playdays ? (
              competition.playdays?.map((playday, i) => {
                return (
                  <div key={i}>
                    <h3 className="text-xl my-3">Speeldag {i + 1}</h3>
                    <ul>
                      {playday.map((match, j) => {
                        return (
                          <li key={match.team1 + match.team2} className="my-5">
                            {match.team1} vs {match.team2}
                            <Link
                              href={`/competitie/beheer/wedstrijdblad?competitionID=${
                                competition.competitionID
                              }&playdayNumber=${i + 1}&matchNumber=${j + 1}`}
                              className="ml-3 bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded"
                            >
                              Scores ingeven
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            ) : (
              <p>Er zijn geen speeldagen voor deze competitie</p>
            )}
          </div>
        ))
      ) : (
        <p>Er zijn geen actieve competities ingesteld.</p>
      )}
    </>
  );
};

export default Speeldagen;
