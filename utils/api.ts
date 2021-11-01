import { Archive, Post } from "./models";

const handleResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error(`${res.statusText}`);
  }
  return res.json();
};

export const getPosts = (offset = 0, limit = 10): Promise<Post[]> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?offset=${offset}&limit=${limit}`
  ).then(handleResponse);

export const getPostsByMonth = (
  year: number | string,
  month: number | string
): Promise<Post[]> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?year=${year}&month=${month}`
  ).then(handleResponse);

export const getPost = (pid: string): Promise<Post> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${pid}`).then(
    handleResponse
  );

export const getSummary = (): Promise<Archive[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/summary`).then(
    handleResponse
  );
