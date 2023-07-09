export type News = {
  newsID: string;
  title: string;
  description: string;
  datePublished: number;
  text: string;
  authorID: string;
  dateCreated: number;
  deleted?: boolean;
};
