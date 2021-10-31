import { Post } from "./models";

export const getPosts = (): Promise<Post[]> =>
  fetch("/api/posts").then((res) => res.json());
