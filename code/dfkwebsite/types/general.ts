import { Player } from "./player";

export enum TROPHY {
  GOLD = 0,
  SILVER = 1,
  BRONZE = 2,
}

export enum ENTITY {
  PLAYER = 0,
  TEAM = 1,
  CLUB = 2,
}

export type PlayerTeam = {
  id: string;
  playerID: string;
  teamID: string;
};

export type TeamClub = {
  id: string;
  teamID: string;
  clubID: string;
};

export type Address = {
  street: string;
  city: string;
  housenumber: string;
  postal: string;
};

export type Account = {
  accountID: string;
  playerID: number;
  username: string;
  email: string;
  password: string;
  player: Player;
};

export enum ENTITY_TYPE {
  PLAYER = "PLAYER",
  TEAM = "TEAM",
  CLUB = "CLUB",
}


export type PersonRanking = {
  id: number;
  name: string;
  ploeg: string;
  punten: number;
  "180": number;
  shot: number;
  k_leg: number;
  trophy?: TROPHY;
};

export type TeamRanking = {
  id: number;
  ploegnaam: string;
  gespeeld: number;
  gewonnen: number;
  gelijk: number;
  verloren: number;
  voor: number;
  tegen: number;
  punten: number;
  trophy?: TROPHY;
};

export type Question = {
  questionID: number;
  question: string;
  answer: string;
};
