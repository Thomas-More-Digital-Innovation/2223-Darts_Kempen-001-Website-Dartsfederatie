import { Regex } from "./commonRegexPatterns";
import { fieldInformation } from "./fieldsCheck";

export enum PostSubmission {
  TITLE = "title",
  DATEPUBLISHED = "datePublished",
  TEXT = "text",
  AUTHORID = "authorID",
  THUMBNAIL = "thumbnail",
  THUMBNAILALT = "thumbnailAlt",
}

export const postRegexPatterns: { [key: string]: fieldInformation } = {
  [PostSubmission.TITLE]: { regex: /^[a-zA-Z0-9 ]+$/, required: true },
  [PostSubmission.DATEPUBLISHED]: { regex: /^[0-9]+$/, required: false },
  [PostSubmission.TEXT]: { required: true },
  [PostSubmission.AUTHORID]: { regex: Regex.User, required: true },
  [PostSubmission.THUMBNAIL]: { regex: Regex.Image, required: false },
  [PostSubmission.THUMBNAILALT]: { regex: /^[a-zA-Z]+$/, required: false },
};
