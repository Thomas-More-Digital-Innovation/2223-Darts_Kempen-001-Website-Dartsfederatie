import { fieldInformation } from "./fieldsCheck";

export enum NewsSubmission {
  TITLE = "title",
  DESCRIPTION = "description",
  DATE = "date",
  TEXT = "text",
}

export const newsRegexPatterns: { [key: string]: fieldInformation } = {
    [NewsSubmission.TITLE]: { regex: /^[a-zA-Z ]+$/, required: true },
    [NewsSubmission.DESCRIPTION]: { regex: /^[a-zA-Z ]+$/, required: true },
    [NewsSubmission.DATE]: { regex: /^[0-9]+$/, required: true },
    [NewsSubmission.TEXT]: { regex: /^[a-zA-Z ]+$/, required: true },
};
