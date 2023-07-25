export type Post = {
  postID: string;
  title: string;
  datePublished: number;
  text: string;
  authorID?: string;
  dateCreated?: number;
  src: string;
  srcAlt: string;
  deleted?: boolean;
};

export interface PostFront extends Post {
  textFormatted: string; // Text will be stored in markdown format in the database, it needs to be converted to HTML for display
}
