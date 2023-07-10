import { TableData } from "../pages/competitie/beheer/playdays";
import { Team } from "./team";

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

export type CompetitionWrapper = {
  competitionID: string;
  name: string;
  startDate: number;
  endDate: number;
  dateCreated: number;
  dateLastModified: number;
  type: COMPETITION_TYPE;
  competitionIDs: string[];
};

export interface CompetitionWrapperFront extends CompetitionWrapper {
  competitions: Competition[];
}

export type Competition = {
  competitionID: string;

  classification: CLASSIFICATION;
  playdays?: TableData[][];
  teamsID?: Array<string>;
  deleted?: boolean;
};

export interface CompetitionFront extends Competition {
  teams: Team[];
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
