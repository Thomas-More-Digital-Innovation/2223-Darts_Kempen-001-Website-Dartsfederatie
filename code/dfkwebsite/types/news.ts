export type News = {
  newsID: string;
  title: string;
  datePublished: number;
  text: string;
  authorID?: string;
  dateCreated?: number;
  src: string;
  srcAlt: string;
  deleted?: boolean;
};
