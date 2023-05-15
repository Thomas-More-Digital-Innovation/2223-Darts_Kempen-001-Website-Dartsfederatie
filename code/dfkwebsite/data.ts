import { managementData } from "./components/ManagementCard";
import { Club } from "./types/club";
import { CLASSIFICATION } from "./types/general";
import { PlayerFront } from "./types/player";
import { TeamFront } from "./types/team";

export const players: Array<PlayerFront> = [];

export const teams: Array<TeamFront> = [
  {
    name: "sunt laborum",
    classification: CLASSIFICATION.PROVINCIAAL,
    clubID: "id:123456798",
    playersID: ["id:123456798", "id:123456798", "id:123456798"],
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
export let club: Array<Club> = [
  {
    clubID: "1",
    name: "Dessel Sport",
    address: {
      street: "Kerkstraat",
      city: "Dessel",
      houseNumber: "1",
      postalCode: "2480",
    },
    contactPersonID: "1",
  },
];

// const news = Array.from({ length: 20 }, (_, i) => ({
//     id: `${i}`,
//     title: `Project ${i}`,
//     description: `Description ${i}`,
//     date: i,
//     text: `Text ${i}`,
// }));

// export function createNews() {
//   news.forEach((item: News) => {
//   let data = new FormData();
//   data.append("title", item.title);
//   data.append("description", item.description);
//   data.append("date", item.date.toString());
//   data.append("text", item.text);

//   fetch("/api/news/add",{
//       body: data,
//       method: "POST",
//   }).then(response => console.log(response));
// });
// }

// const playerslist = Array.from({ length: 20 }, (_, i) => ({
//     id: `${i}`,
//     firstname: `Firstname ${i}`,
//     lastname: `Lastname ${i}`,
//     phone: `Phone ${i}`,
//     allowed: i % 2 === 0,
// }));

// export function createPlayers() {
//   playerslist.forEach((item: Player) => {
//   let data = new FormData();
//   data.append("firstname", item.firstName);
//   data.append("lastname", item.lastName);
//   data.append("phone", item.phone);
//   data.append("allowed", item.allowedToPlay.toString());

//   fetch("/api/player/add",{
//       body: data,
//       method: "POST",
//   }).then(response => console.log(response));
// });
// }
