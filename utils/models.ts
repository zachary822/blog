export type Post = {
  created: string;
  body: string;
  image?: string;
  imageLabel?: string;
  title: string;
};

export type Archive = {
  _id: {
    year: number;
    month: number;
  };
  count: number;
};
