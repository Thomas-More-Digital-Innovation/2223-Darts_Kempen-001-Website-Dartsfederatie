import * as dummyData from "../data";
import { Club } from "../types/club";
import { CLASSIFICATION, COMPETITION_TYPE } from "../types/competition";
import { Player } from "../types/player";
import { Team } from "../types/team";
import { CompetitionSubmission } from "./competition";
import { fieldInformation } from "./fieldsCheck";
import lodash from "lodash";

const availableParams = [
  // General
  { name: "limit", regex: /^[0-9]+$/, castFunction: Number, default: 100 },
  { name: "cursor", regex: /^[a-zA-Z]*$/ },
  // Competition
  { name: "competitionID" },
  { name: "playdayNumber", regex: /^[0-9]+$/, castFunction: Number },
  { name: "matchNumber", regex: /^[0-9]+$/, castFunction: Number },
  { name: "startDate" },
  { name: "endDate" },
  { name: "amountTeams", regex: /^[0-9]+$/, castFunction: Number },
  { name: "prefix", regex: /^[a-zA-Z:]+$/, default: "id:" },
  { name: "dummy", regex: /^[0-1]$/, default: false, castFunction: Number },
];
type urlParamsType = {
  // General
  limit: number;
  cursor?: string;
  prefix: string;
  // Competition
  competitionID?: string;
  playdayNumber?: number;
  matchNumber?: number;
  amountTeams?: number;
  startDate: string;
  endDate: string;
  dummy?: boolean;
};

export const getParams = (url: string) => {
  if (url.startsWith("/")) url = "https://www.placeholder.xyz/" + url;
  const urlObject = new URL(url);
  const data: { [key: string]: any } = {};
  availableParams.forEach((availableParam) => {
    // If url does not include param, it shouldn't be tested nor included, except if it has a default value
    if (!urlObject.searchParams.has(availableParam.name)) {
      if (availableParam.default)
        data[availableParam.name] = availableParam.default;
      return;
    }

    // Assign value from the url since the parameter does exist
    const value = urlObject.searchParams.get(availableParam.name);

    if (!value) return;
    // Could instead return an error if the regex does not match with the string
    if (availableParam.regex && !value.match(availableParam.regex)) return;

    // If value has a casting function, execute it first, otherwise add the raw (string) value
    try {
      data[availableParam.name] = availableParam.castFunction
        ? availableParam.castFunction(value)
        : value;
    } catch (e: any) {
      throw new Error(
        `The value ${value} could not be casted using the function ${availableParam.castFunction}`
      );
    }
  });

  return data as urlParamsType;
};

export const searchKeyChecker = async (
  namespace: any, // todo: change to KVNamespace
  keyToPush: string,
  searchKeyToPushTo: string
) => {
  const existingValue: Array<string> = await namespace.get(searchKeyToPushTo, {
    type: "json",
  });
  if (!existingValue)
    await namespace.put(searchKeyToPushTo, JSON.stringify([keyToPush]));
  else {
    existingValue.push(keyToPush);
    await namespace.put(searchKeyToPushTo, JSON.stringify(existingValue));
  }
};

export const getRecordByIdOrError = async (id: string, namespace: any) => {
  // TODO: namespace type
  const record = await namespace.get(id);

  if (!record) throw new Error(`Record with id: ${id} not found`);

  return record;
};

export const getNextFriday = (startDate: Date) => {
  return new Date(
    startDate.setDate(startDate.getDate() + ((5 - startDate.getDay() + 7) % 7))
  );
};

export const countFridays = (startDate: Date, endDate: Date) => {
  let dateCursor = getNextFriday(startDate);
  let amountFridays = 0;
  while (dateCursor.getTime() < endDate.getTime()) {
    dateCursor = getNextFriday(
      new Date(dateCursor.setDate(dateCursor.getDate() + 1))
    );
    amountFridays++;
  }
  return amountFridays;
};

export const changeData = async (
  fieldsInformation: { [key: string]: fieldInformation },
  currentData: Object,
  newData: FormData
) => {
  const data = JSON.parse(JSON.stringify(currentData));
  console.log("initial data", data);

  // Can I use a foreach here?

  // for (const field of Object.keys(fieldsInformation)) {
  Object.keys(fieldsInformation).forEach((field) => {
    if (!newData.has(field)) return;
    let newValue = newData.get(field);

    const fieldInformation = fieldsInformation[field];

    // If value is required and formData does not contain the field, error
    if (
      fieldInformation?.required &&
      (!newData.has(field) || newValue == "") &&
      !data[field]
    )
      throw new Error(`Field "${field}" is required.`);

    if (
      fieldInformation?.regex &&
      newData.has(field) &&
      !newValue?.toString().match(fieldInformation.regex) &&
      !fieldInformation.required &&
      newValue != ""
    )
      throw new Error(`Field "${field}" does not match the required pattern`);

    // If value has a casting function, execute it first, otherwise add the raw (string) value
    try {
      lodash.set(
        data,
        field.replace(/_/g, "."),
        fieldInformation.castFunction
          ? fieldInformation.castFunction(newValue)
          : newValue
      );

      console.log("dataNow", data);

      //field = clubID

      // mutate other side
    } catch (e: any) {
      throw new Error(
        `The value ${newValue} could not be casted using the function ${fieldInformation.castFunction}`
      );
    }
  });

  for (const field of Object.keys(fieldsInformation).filter((field) =>
    newData.has(field)
  )) {
    if (mutateOtherSide[field]) {
      const mutateField = mutateOtherSide[field];

      let newValue = data[mutateField.fieldToGet];
      let currentValue = await fetch(
        `http://localhost:8788${mutateField.mutateAPI}/${data[field]}`,
        { method: "GET" }
      )
        .then((res) => res.json())
        .catch((e) => {
          throw new Error(e);
        });

      let valueToChange =
        (currentValue[mutateField.mutateField] as Array<any>) || [];

      if (mutateField.method == METHODS.APPEND) {
        valueToChange.push(newValue);

        // fetch first
      } else if (mutateField.method == METHODS.REMOVE) {
        valueToChange = valueToChange.filter((value) => value != newValue);
        //fetch first
      } else if (mutateField.method == METHODS.REPLACE) {
        valueToChange = newValue;
      }

      console.log("valueTochange", valueToChange);

      let dataToSend = new FormData();
      dataToSend.append(mutateField.mutateField, JSON.stringify(valueToChange));
      console.log(dataToSend);

      await fetch(
        `http://localhost:8788${mutateField.mutateAPI}/${data[field]}`,
        {
          method: "PUT",
          body: dataToSend,
        }
      ).catch((e) => console.log(e));
    }
  }

  return data;
};

type mutateField = {
  sourceAPI: string;
  mutateAPI: string;
  mutateField: string;
  fieldToGet: string;
  method: METHODS;
};

enum METHODS {
  APPEND = "append",
  REMOVE = "remove",
  REPLACE = "replace",
}

export const mutateOtherSide: { [key: string]: mutateField } = {
  clubID: {
    sourceAPI: "/api/teams",
    mutateAPI: "/api/clubs",
    fieldToGet: "teamID",
    mutateField: "teamIDs",
    method: METHODS.APPEND,
  },
  playerIDs: {
    sourceAPI: "/api/teams",
    mutateAPI: "/api/players",
    fieldToGet: "teamID",
    mutateField: "teamIDs",
    method: METHODS.APPEND,
  },
  teamIDs: {
    sourceAPI: "/api/players",
    mutateAPI: "/api/teams",
    fieldToGet: "playerID",
    mutateField: "playerIDs",
    method: METHODS.APPEND,
  },
};

export type SelectOption = {
  value: string;
  label?: string;
};

export const getAllSelectOptionsByName = async (
  api: string,
  labelField: string | string[],
  valueField: string
): Promise<SelectOption[]> => {
  if (process.env.NEXT_PUBLIC_NO_API) {
    return (dummyData as any)[api].map((item: any) => ({
      label:
        typeof labelField === "object"
          ? labelField.map((field) => item[field]).join(" ")
          : item[labelField],
      value: item[valueField],
    }));
  }

  const response = await fetch(`/api/${api}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from the ${api} API.`);
  }

  const data = await response.json();

  return (data as Object[]).map((item: any) => ({
    label:
      typeof labelField === "object"
        ? labelField.map((field) => item[field]).join(" ")
        : item[labelField],
    value: item[valueField],
  }));
};

export const parseData = async (data: string | string[], namespace: any) => {
  if (typeof data === "string") return JSON.parse(await namespace.get(data));

  return await Promise.all(
    data.map(async (dataKey) => {
      return JSON.parse(await namespace.get(dataKey));
    })
  );
};

export const populateKV = async () => {
  //check if KV is populated
  const isPopulated = (await fetch("/api/players", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())) as Player[];

  if (isPopulated.length > 0) return;

  // populate /api/players
  let player1 = new FormData();
  player1.append("firstname", "John");
  player1.append("lastname", "Doe");
  player1.append("phone", "123456789");
  player1.append("allowed", "1");

  let player2 = new FormData();
  player2.append("firstname", "Jane");
  player2.append("lastname", "Doe");
  player2.append("phone", "987654321");
  player2.append("allowed", "1");

  let player3 = new FormData();
  player3.append("firstname", "John");
  player3.append("lastname", "Smith");
  player3.append("phone", "123456789");
  player3.append("allowed", "1");

  let player4 = new FormData();
  player4.append("firstname", "Jane");
  player4.append("lastname", "Smith");
  player4.append("phone", "987654321");
  player4.append("allowed", "1");

  let players = [player1, player2, player3, player4];
  let playerIDs: string[] = [];

  for (const player of players) {
    const response = await fetch("/api/players", {
      method: "POST",
      body: player,
    });
    if (!response.ok) {
      console.log("Error populating KV");
      return;
    } else {
      const data = (await response.json()) as Player;
      playerIDs.push(data.playerID);
    }
  }

  // populate /api/clubs using ClubSubmission as reference
  let club1 = new FormData();
  club1.append("name", "Club 1");
  club1.append("address_street", "Street 1");
  club1.append("address_housenumber", "1");
  club1.append("address_city", "City 1");
  club1.append("address_postal", "1000");
  club1.append("contactpersonID", playerIDs[0]);

  let club2 = new FormData();
  club2.append("name", "Club 2");
  club2.append("address_street", "Street 2");
  club2.append("address_housenumber", "2");
  club2.append("address_city", "City 2");
  club2.append("address_postal", "2000");
  club2.append("contactpersonID", playerIDs[1]);

  let clubs = [club1, club2];
  let clubIDs: string[] = [];

  for (const club of clubs) {
    const response = await fetch("/api/clubs", {
      method: "POST",
      body: club,
    });
    if (!response.ok) {
      console.log("Error populating KV");
      return;
    } else {
      const data = (await response.json()) as Club;
      clubIDs.push(data.clubID);
    }
  }

  // populate /api/teams using TeamSubmission as reference
  let team1 = new FormData();
  team1.append("name", "Team 1");
  team1.append("playerIDs", JSON.stringify([playerIDs[0], playerIDs[1]]));
  team1.append("classification", CLASSIFICATION.PROVINCIAAL);
  team1.append("clubID", clubIDs[0]);
  team1.append("captainID", playerIDs[0]);

  let team2 = new FormData();
  team2.append("name", "Team 2");
  team2.append("playerIDs", JSON.stringify([playerIDs[2], playerIDs[3]]));
  team2.append("classification", CLASSIFICATION.GEWEST_1);
  team2.append("clubID", clubIDs[1]);
  team2.append("captainID", playerIDs[2]);

  let teams = [team1, team2];
  let teamIDs = [];

  for (const team of teams) {
    const response = await fetch("/api/teams", {
      method: "POST",
      body: team,
    });
    if (!response.ok) {
      console.log("Error populating KV");
      return;
    } else {
      const data = (await response.json()) as Team;
      teamIDs.push(data.teamID);
    }
  }

  // populate /api/competition using CompetitionSubmission as reference
  let competition1 = new FormData();
  competition1.append("type", COMPETITION_TYPE.COMPETITION);
  competition1.append("classification", CLASSIFICATION.PROVINCIAAL);
  competition1.append("startdate", "2021-01-01");
  competition1.append("enddate", "2021-01-31");

  competition1.append("teamIDs", JSON.stringify([teamIDs[0], teamIDs[1]]));
  competition1.append(
    "playdays",
    JSON.stringify([
      [
        { team1: teamIDs[0], team2: teamIDs[1] },
        { team1: teamIDs[0], team2: teamIDs[1] },
      ],
      [
        { team1: teamIDs[0], team2: teamIDs[1] },
        { team1: teamIDs[0], team2: teamIDs[1] },
      ],
      [
        { team1: teamIDs[1], team2: teamIDs[0] },
        { team1: teamIDs[1], team2: teamIDs[0] },
      ],
      [
        { team1: teamIDs[1], team2: teamIDs[0] },
        { team1: teamIDs[1], team2: teamIDs[0] },
      ],
    ])
  );

  let competitions = [competition1];

  for (const competition of competitions) {
    const response = await fetch("/api/competition", {
      method: "POST",
      body: competition,
    });
    if (!response.ok) {
      console.log("Error populating KV");
      return;
    }
  }
};
