import { Archive, Post } from "./models";

export const getPosts = (): Promise<Post[]> =>
  fetch("/api/posts").then((res) => res.json());

export const getSummary = (): Promise<Archive[]> =>
  fetch("/api/summary").then((res) => res.json());
