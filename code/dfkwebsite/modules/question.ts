import { fieldInformation } from "./fieldsCheck";

export enum QuestionSubmission {
  QUESTION = "question",
  ANSWER = "answer",
}

export const questionRegexPatterns: { [key: string]: fieldInformation } = {
    [QuestionSubmission.QUESTION]: { regex: /^[a-zA-Z0-9\s,'-]*$/, required: true },
    [QuestionSubmission.ANSWER]: { regex: /^[a-zA-Z0-9\s,'-]*$/, required: true },
};
