import { User } from "./user";

export type Post = {
  postID: string;
  title: string;
  dateCreated: number;
  dateModified?: number;
  datePublished?: number;
  text: string;
  authorID: string;
  thumbnail: string;
  thumbnailAlt: string;
  deleted?: boolean;
};

//TODO: Check if this is the best way to do this (datePublished optionality)
export interface PostFront extends Post {
  textFormatted: string; // Text will be stored in markdown format in the database, it needs to be converted to HTML for display
  datePublished: number;
  author: User;
}
