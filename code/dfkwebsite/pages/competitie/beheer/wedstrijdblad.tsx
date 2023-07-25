import { NextPage } from "next";
import DefaultCheckbox from "@/components/DefaultCheckbox";
import { ChangeEvent, useEffect, useState } from "react";
import { SelectOption, getParams } from "@/modules/general";
import { useRouter } from "next/router";
import {
  CompetitionPartialFront,
  Playday,
  SCORETYPE,
  Score,
} from "../../../types/competition";
import { TableData } from "./playdays";
import { TeamFront } from "../../../types/team";
import DefaultInput from "../../../components/DefaultInput";
import DefaultSelect from "../../../components/DefaultSelect";
import { ActionMeta } from "react-select";
import { Match } from "../../../types/match";
import { PlayerFront } from "../../../types/player";
import { getPlayers } from "../../../modules/player";

const WedstrijdbladBeheer: NextPage = () => {
  const [competition, setCompetition] =
    useState<CompetitionPartialFront | null>(null);
  const [playday, setPlayday] = useState<TableData[]>([]);
  const [teamHome, setHome] = useState<TeamFront | null>(null);
  const [teamHomeSelects, setTeamHomeSelects] = useState<SelectOption[] | null>(
    null
  );
  const [teamAway, setAway] = useState<TeamFront | null>(null);
  const [teamAwaySelects, setTeamAwaySelects] = useState<SelectOption[] | null>(
    null
  );

  const [matchTeams, setMatchTeams] = useState<{
    team1: TeamFront | null;
    team2: TeamFront | null;
  }>({ team1: null, team2: null });

  const handleSubmit = async () => {
    let params = getParams(router.asPath);

    let data = new FormData();
    data.append("scores", JSON.stringify(scores));

    console.log(
      `/api/competition/${params.competitionID}/playdays/${params.playdayNumber}/match/${params.matchNumber}`
    );

    fetch(
      `/api/competition/${params.competitionID}/playdays/${params.playdayNumber}/match/${params.matchNumber}`,
      { method: "PUT", body: data }
    ).catch((err) => console.log(err));
  };

  const router = useRouter();

  const [spelers, setSpelers] = useState<SelectOption[]>([]);

  useEffect(() => {
    console.log("WedstrijdbladBeheer");
    let params = getParams(router.asPath);
    console.log(params);

    if (!params.competitionID) {
      console.log("No competition ID found");
      return;
    }

    if (!params.playdayNumber) {
      console.log("No playday number found");
      return;
    }

    fetch(`/api/competition/${params.competitionID}`)
      .then((res) => res.json())
      .then((parsedCompetition: CompetitionPartialFront) => {
        if (!parsedCompetition) {
          console.log("No competition found");
          return;
        }
        setCompetition(parsedCompetition);

        console.log(parsedCompetition);

        if (!parsedCompetition.playdays) {
          console.log("No playdays found");
          return;
        }

        if (!params.playdayNumber) {
          console.log("No playday number found");
          return;
        }

        if (parsedCompetition.playdays.length < params.playdayNumber) {
          console.log("Playday not found");
          return;
        }

        setPlayday(parsedCompetition.playdays[params.playdayNumber - 1]);

        console.log(parsedCompetition.playdays[params.playdayNumber - 1]);

        if (!params.matchNumber) {
          console.log("No match number found");
          return;
        }

        if (
          parsedCompetition.playdays[params.playdayNumber - 1].length <
          params.matchNumber
        ) {
          console.log("Match not found");
          return;
        }

        let match =
          parsedCompetition.playdays[params.playdayNumber - 1][
            params.matchNumber - 1
          ];

        console.log(params.matchNumber, match);

        fetch(`/api/teams/${match?.team1}`)
          .then((res) => res.json())
          .then((parsedTeams: TeamFront) => {
            setHome(parsedTeams);
            setTeamHomeSelects(
              parsedTeams?.players?.map((player) => {
                return {
                  label: `${player.firstName} ${player.lastName}`,
                  value: player.playerID,
                };
              }) ?? []
            );
          })
          .catch((err) => {
            console.log("Error while fetching team");
            console.log(err);
          });

        fetch(`/api/teams/${match?.team2}`)
          .then((res) => res.json())
          .then((parsedTeams: TeamFront) => {
            setAway(parsedTeams);
            setTeamAwaySelects(
              parsedTeams?.players?.map((player) => {
                return {
                  label: `${player.firstName} ${player.lastName}`,
                  value: player.playerID,
                };
              }) ?? []
            );
          })
          .catch((err) => {
            console.log("Error while fetching team");
            console.log(err);
          });

        console.log(matchTeams);

        fetch(
          `/api/competition/${params.competitionID}/playdays/${params.playdayNumber}/match/${params.matchNumber}`
        )
          .then((res) => res.json())
          .then((parsedScores: Match) => {
            if (parsedScores.scores) {
              setScores(parsedScores.scores);
              console.log("scores", parsedScores.scores);
            } else {
              setScores(
                Array.from({ length: 3 }, () =>
                  Array.from({ length: 10 }).map(() => {
                    return {} as Score;
                  })
                )
              );
            }
          })
          .catch((err) => console.log(err));

        getPlayers()
          .then((players) => setSpelers(players))
          .catch((err) => console.log(err));

        return parsedCompetition;
      })
      .catch((err) => {
        console.log("Error while fetching competition");
        console.log(err);
        return null;
      });
  }, []);

  const [scores, setScores] = useState<Score[][]>([]);
  type ScoreType = keyof Score;

  const handleChange = (
    value: string,
    series: number,
    index: number,
    type: string
  ) => {
    let newScores: Score[][] = JSON.parse(JSON.stringify(scores));
    // @ts-ignore
    newScores[series][index][type as ScoreType] = value;

    console.log(series, index);

    console.log(newScores[series][index]);
    console.log(newScores);

    setScores(newScores);
  };

  const getRow = (series: number, index: number, reversed: boolean) => {
    return (
      <div className="grid col-span-6 grid-cols-6 children:px-3">
        {reversed ? (
          <>
            <DefaultInput
              key={`${series}-${index}-180`}
              name="180"
              placeholder="180"
              value={scores?.[series]?.[index]?.oneEighty}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "oneEighty")
              }
            />

            <p className="col-span-2">
              <DefaultSelect
                key={`${series}-${index}-player`}
                labelEnabled={false}
                options={teamHomeSelects ?? []}
                name="player"
                search
                value={spelers.find(
                  (speler) =>
                    scores?.[series]?.[index]?.playerID === speler.value
                )}
                onSelectChange={(value: SelectOption, action: any) => {
                  handleChange(value.value, series, index, "playerID");
                  console.log("test");
                  console.log(value.value);
                }}
              />
            </p>
            <DefaultInput
              key={`${series}-${index}-kleg`}
              name="kleg"
              placeholder="kleg"
              value={scores?.[series]?.[index]?.kleg}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "kleg")
              }
            />
            <DefaultInput
              key={`${series}-${index}-hu`}
              name="hu"
              placeholder="hu"
              value={scores?.[series]?.[index]?.hu}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "hu")
              }
            />
            <DefaultInput
              key={`${series}-${index}-bestof`}
              name="score"
              placeholder="score"
              value={scores?.[series]?.[index]?.bestOf}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "bestOf")
              }
            />
          </>
        ) : (
          <>
            <DefaultInput
              key={`${series}-${index}-bestof`}
              name="score"
              placeholder="score"
              value={scores?.[series]?.[index]?.bestOf}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "bestOf")
              }
            />
            <DefaultInput
              key={`${series}-${index}-hu`}
              name="hu"
              placeholder="hu"
              value={scores?.[series]?.[index]?.hu}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "hu")
              }
            />
            <DefaultInput
              key={`${series}-${index}-kleg`}
              name="kleg"
              placeholder="kleg"
              value={scores?.[series]?.[index]?.kleg}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "kleg")
              }
            />

            <p className="col-span-2">
              <DefaultSelect
                key={`${series}-${index}-player`}
                labelEnabled={false}
                options={teamHomeSelects ?? []}
                name="player"
                search
                value={spelers.find(
                  (speler) =>
                    scores?.[series]?.[index]?.playerID === speler.value
                )}
                onSelectChange={(value: SelectOption, action: any) => {
                  handleChange(value.value, series, index, "playerID");
                  console.log("test");
                  console.log(value.value);
                }}
              />
            </p>
            <DefaultInput
              key={`${series}-${index}-180`}
              name="180"
              placeholder="180"
              value={scores?.[series]?.[index]?.oneEighty}
              onChange={(e) =>
                handleChange(e.target.value, series, index, "oneEighty")
              }
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="text-white">
      <div className="grid grid-cols-2 bg-nav-background children:border children:pl-5 children:py-2">
        {/* <p className="col-span-2 text-center font-semibold text-3xl pl-0">
        Reeks: Competitie 2022 - 2023 - Provinciaal Speeldag: Speeldag 01
          Datum: 30-09-2022
        </p> */}
        <p className="col-span-2 text-center font-semibold text-3xl pl-0">
          Reeks: / - {competition?.competition.startDate} -{" "}
          {competition?.classification} Speeldag: / - Datum: /
        </p>
        <p className="text-lg font-semibold">THUISSPELERS: {teamHome?.name}</p>
        <p className="text-lg font-semibold">BEZOEKERS: {teamAway?.name}</p>
        <p className="text-xl bg-background">NAAM EN VOORNAAM</p>
        <p className="text-xl bg-background">NAAM EN VOORNAAM</p>

        <div>
          {teamHome?.players?.map((player) => {
            return (
              <p key={player.playerID}>
                {player.firstName} {player.lastName}
              </p>
            );
          })}
        </div>

        <div>
          {teamAway?.players?.map((player) => {
            return (
              <p key={player.playerID}>
                {player.firstName} {player.lastName}
              </p>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-12 bg-nav-background children:border children:py-2 children:text-center">
        <p className="text-xl col-span-5 bg-background">NAAM EN VOORNAAM</p>
        <p className="text-xl col-span-2 bg-background">UITSLAG</p>
        <p className="text-xl col-span-5 bg-background">NAAM EN VOORNAAM</p>

        <p className="text-lg">180</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg col-span-2">Best of 7 - 501</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">180</p>

        {getRow(0, 0, true)}
        {getRow(0, 1, false)}

        {getRow(0, 2, true)}
        {getRow(0, 3, false)}

        <p className="text-lg">180</p>
        <p className="text-lg col-span-2">DUBBELS</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg col-span-2">Best of 5 - 701</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg col-span-2">DUBBELS</p>
        <p className="text-lg">180</p>

        {getRow(1, 0, true)}
        {getRow(1, 1, false)}

        {getRow(1, 2, true)}
        {getRow(1, 3, false)}

        {getRow(1, 4, true)}
        {getRow(1, 5, false)}
        {getRow(1, 6, true)}
        {getRow(1, 7, false)}

        {getRow(1, 8, true)}
        {getRow(1, 9, false)}

        <p className="text-lg">180</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg col-span-2">Best of 7 - 501</p>
        <p className="text-lg">H.U.</p>
        <p className="text-lg">KLEG</p>
        <p className="text-lg col-span-2">ENKELSPELEN</p>
        <p className="text-lg">180</p>

        {getRow(2, 0, true)}
        {getRow(2, 1, false)}

        {getRow(2, 2, true)}
        {getRow(2, 3, false)}

        <p className="text-lg col-span-5 border-b-0">Notities</p>
        <p className="text-lg col-span-2">EINDUITSLAG</p>
        <p className="text-lg col-span-5 border-b-0">Notities</p>

        <p className="col-span-5 py-10 border-y-0"></p>
        <p className="col-span-1">4</p>
        <p className="col-span-1">6</p>
        <p className="col-span-5 border-y-0"></p>

        <div className="col-span-12 flex justify-center items-center">
          <DefaultCheckbox label="Definitief opslaan" name="save_permanent" />
        </div>
        <button className="text-lg col-span-12" onClick={() => handleSubmit()}>
          Opslaan
        </button>
      </div>
    </div>
  );
};

export default WedstrijdbladBeheer;
