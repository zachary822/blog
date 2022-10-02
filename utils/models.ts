import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type BasePost = {
  _id: string;
  created: string;
  updated: string;
  image?: string;
  imageLabel?: string;
  title: string;
};

export interface RawPost extends BasePost {
  body: string;
}

export interface Post extends BasePost {
  body: MDXRemoteSerializeResult;
}

export type Archive = {
  year: number;
  month: number;
  count: number;
};

export type ErrorResponse = {
  error: string;
};
