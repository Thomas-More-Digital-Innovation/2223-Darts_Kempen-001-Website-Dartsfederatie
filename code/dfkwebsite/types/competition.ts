import { TableData } from "../pages/competitie/beheer/playdays";
import { Team, TeamFront } from "./team";

export enum CLASSIFICATION {
  PROVINCIAAL = "PROVINCIAAL",
  GEWEST_1 = "GEWEST 1",
  GEWEST_2 = "GEWEST 2",
  GEWEST_3 = "GEWEST 3",
}

export enum COMPETITION_TYPE {
  COMPETITION = "COMPETITION",
  TROPHY = "TROPHY",
}

export type Competition = {
  competitionID: string;
  teamAmount: number;
  startDate: number;
  endDate: number;
  dateCreated: number;
  dateLastModified: number;
  classification: string[];
  type: COMPETITION_TYPE;
  competitionIDs: string[];
};

export interface CompetitionFront extends Competition {
  competitions: CompetitionPartial[];
}

export type CompetitionPartial = {
  competitionPartialID: string;
  competitionID: string;
  classification: CLASSIFICATION;
  playdays?: TableData[][];
  teamsID?: Array<string>;
  deleted?: boolean;
};

export interface CompetitionPartialFront extends CompetitionPartial {
  competition: Competition;
  teams: TeamFront[];
}

export type Playday = {
  playdayID: string;
  date: number;
  competitionID: string;
};

export enum SCORETYPE {
  ENKELSPELEN = 0,
  DUBBELS = 1,
}

export type Score = {
  playerID: string;
  oneEighty: number;
  bestOf: number;
  kleg: number;
  hu: number;
  type: SCORETYPE;
};

export type Game = {
  gameID: string;
  playdayNumber: number;
  teamHomeID?: string;
  teamAwayID?: string;

  notes: string;
  filledDate: number;
  permaSaved: boolean;
  datePlayed: number;
  dateCreated: number;
  dateLastModified: number;
  scores: Score[][];
};

export interface GameFront extends Game {
  teamHome: Team;
  teamAway: Team;
}
