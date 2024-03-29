export type BasePost = {
  _id: string;
  created: string;
  updated: string;
  image?: string;
  imageLabel?: string;
  title: string;
  summary?: string;
  tags: string[];
};

export interface Post extends BasePost {
  body: string;
}

export type Month = {
  year: number;
  month: number;
  count: number;
};

export type Tag = {
  name: string;
  count: number;
};

export type Summary = {
  monthly: Month[];
  tags: Tag[];
};

export type ErrorResponse = {
  error: string;
};
