import { fieldInformation } from "./fieldsCheck";

export enum PlayerSubmission {
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  PHONE = "phone",
  ALLOWED = "allowed",
}

export const playerRegexPatterns: { [key: string]: fieldInformation } = {
  [PlayerSubmission.FIRSTNAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [PlayerSubmission.LASTNAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [PlayerSubmission.PHONE]: { regex: /^[0-9]+$/, required: false },
  [PlayerSubmission.ALLOWED]: { regex: /^[0-1]+$/, required: false },
};
