import { managementData } from "./components/ManagementCard";
import {
  CLASSIFICATION,
  COMPETITION_TYPE,
  Competition,
  CompetitionFront,
  CompetitionPartialFront,
} from "./types/competition";
import { ClubFront } from "./types/club";
import { PlayerFront } from "./types/player";
import { TeamFront } from "./types/team";
import { User } from "./types/user";

export const players: Array<PlayerFront> = [
  {
    firstName: "Bryan",
    lastName: "Deckers",
    phone: "+32 123 45 67 89",
    allowedToPlay: true,
    playerID: "id:123456798",
  },
  {
    firstName: "Joske",
    lastName: "Vermeulen",
    phone: "+32 123 45 67 89",
    allowedToPlay: true,
    playerID: "id:77777242424",
  },
];

export const users: User[] = [
  {
    userID: "id:123456798",
  },
];

export const teams: Array<TeamFront> = [
  {
    name: "sunt laborum",
    classification: CLASSIFICATION.PROVINCIAAL,
    clubID: "id:123456798",
    playerIDs: ["id:123456798", "id:77777242424", "id:123456798"],
    players: players,
    teamID: "id:123456798",
    captainID: "id:123456798",
    captain: {
      firstName: "Bryan",
      lastName: "Deckers",
      phone: "+32 123 45 67 89",
      allowedToPlay: true,
      playerID: "id:123456798",
    },
  },
  {
    name: "something else",
    classification: CLASSIFICATION.PROVINCIAAL,
    clubID: "id:123456798",
    playerIDs: ["id:123456798", "id:77777242424", "id:123456798"],
    players: players,
    teamID: "id:123456798",
    captainID: "id:123456798",
    captain: {
      firstName: "Bryan",
      lastName: "Deckers",
      phone: "+32 123 45 67 89",
      allowedToPlay: true,
      playerID: "id:123456798",
    },
  },
  {
    name: "team3",
    classification: CLASSIFICATION.PROVINCIAAL,
    clubID: "id:123456798",
    playerIDs: ["id:123456798", "id:77777242424", "id:123456798"],
    players: players,
    teamID: "id:123456798",
    captainID: "id:123456798",
    captain: {
      firstName: "Bryan",
      lastName: "Deckers",
      phone: "+32 123 45 67 89",
      allowedToPlay: true,
      playerID: "id:123456798",
    },
  },
  {
    name: "TeamLegend",
    classification: CLASSIFICATION.PROVINCIAAL,
    clubID: "id:123456798",
    playerIDs: ["id:123456798", "id:77777242424", "id:123456798"],
    players: players,
    teamID: "id:123456798",
    captainID: "id:123456798",
    captain: {
      firstName: "Bryan",
      lastName: "Deckers",
      phone: "+32 123 45 67 89",
      allowedToPlay: true,
      playerID: "id:123456798",
    },
  },
];

export const bestuur: Array<managementData> = [
  {
    naam: "Wim Oeyen",
    functie: "Voorzitter",
    mail: "wim.oeyen@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Pieter Fransen",
    functie: "Secretaris",
    mail: "pieter.fransen@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Annelies Cox",
    functie: "Penningmeester",
    mail: "annelies.cox@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Kurt Schepers",
    functie: "Wedstrijdleiding",
    mail: "kurt.schepers@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Mario Vangeel",
    functie: "Competitieopmaak",
    mail: "mario.vangeel@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Willy Cremers",
    functie: "Sportieve cel/standenkeuring",
    mail: "willy.cremers@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
  {
    naam: "Barry Zander",
    functie: "Sporiteve cel/standenkeuring",
    mail: "barry.zander@dfk.be",
    telefoonnummer: "+31 652/71.59.60",
  },
  {
    naam: "Cafe 't Centrum",
    functie: "Ledenbeweging",
    telefoonnummer: "014/54.97.08",
  },
  {
    naam: "Jos Vanbergen",
    functie: "Toernooileiding & sportieve cel/standkeuring",
    mail: "jos.vanbergen@dfk.be",
    telefoonnummer: "(+32) 00 123 45 67 89",
  },
];

//Given the following data, can you create a function that will make multiple of this dummy data?
export let club: Array<ClubFront> = [
  {
    clubID: "1",
    name: "Dessel Sport",
    address: {
      street: "Kerkstraat",
      city: "Dessel",
      housenumber: "1",
      postal: "2480",
    },
    contactPersonID: "1",
    teamIDs: ["1", "2", "3"],
    teams: teams,
    contactPerson: players[0],
  },
];

export const competitions: Array<CompetitionFront> = [
  {
    competitionID: "id:dummy:1",
    type: COMPETITION_TYPE.COMPETITION,
    startDate: 0,
    endDate: 0,
    dateCreated: 0,
    dateLastModified: 0,
    classification: [CLASSIFICATION.PROVINCIAAL],
    competitionIDs: ["id:dummy:partial:1"],
    teamAmount: 5,
    competitions: [],
  },
];

export const competitionPartials: CompetitionPartialFront[] = [
  {
    competitionPartialID: "id:dummy:partial:1",
    classification: CLASSIFICATION.PROVINCIAAL,
    competitionID: competitions[0].competitionID,
    competition: competitions[0],
    teams: teams,
    teamsID: teams.map((team) => team.teamID),
    deleted: false,
    playdays: [
      [
        {
          team1: teams[0].teamID,
          team2: teams[1].teamID,
        },
      ],
    ],
  },
];
