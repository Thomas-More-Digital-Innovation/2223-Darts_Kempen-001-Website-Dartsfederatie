import { fieldInformation } from "./fieldsCheck";

export enum CompetitionSubmission {
  NAME = "name",
  TYPE = "type",
  CLASSIFICATION = "classification",
  STARTDATE = "startdate",
  ENDDATE = "enddate",
  TEAMS = "teamsID",
  PLAYDAYS = "playdays",
  TEAMSAMOUNT = "teamAmount",
}

export const competitionRegexPatterns: { [key: string]: fieldInformation } = {
  [CompetitionSubmission.TYPE]: {
    required: true,
  },
  [CompetitionSubmission.CLASSIFICATION]: {
    required: true,
    castFunction: JSON.parse,
  },
  [CompetitionSubmission.STARTDATE]: {
    required: true,
  },
  [CompetitionSubmission.ENDDATE]: {
    required: true,
  },
  [CompetitionSubmission.TEAMS]: {
    required: false,
    castFunction: JSON.parse,
  },
  [CompetitionSubmission.PLAYDAYS]: {
    required: false,
    castFunction: JSON.parse,
  },
  [CompetitionSubmission.TEAMSAMOUNT]: {
    required: false,
    castFunction: Number,
  },
};

export enum MATCH_SUBMISSION {
  SCORES = "scores",
}

export const matchRegexPatterns: { [key: string]: fieldInformation } = {
  [MATCH_SUBMISSION.SCORES]: {
    required: false,
    castFunction: JSON.parse,
  },
};
