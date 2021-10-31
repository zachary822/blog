import { Archive, Post } from "./models";

export const getPosts = (): Promise<Post[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`).then((res) =>
    res.json()
  );

export const getPostsByMonth = (
  year: number | string,
  month: number | string
): Promise<Post[]> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?year=${year}&month=${month}`
  ).then((res) => res.json());

export const getPost = (pid: string): Promise<Post> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${pid}`).then(
    (res) => res.json()
  );

export const getSummary = (): Promise<Archive[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/summary`).then((res) =>
    res.json()
  );
