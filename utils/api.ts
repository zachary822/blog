import { serializeMarkdown } from "./markdown";
import { Post, RawPost, Summary } from "./models";

const handleResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error(`${res.statusText}`);
  }
  return res.json();
};

const processPost = (post: RawPost) => {
  return Promise.all([
    Promise.resolve(post),
    serializeMarkdown(post.body),
  ]).then(([post, body]) => ({ ...post, body }));
};

interface GetPostConfig {
  query?: string;
  offset?: number;
  limit?: number;
}

export const getPosts = ({
  query,
  offset = 0,
  limit = 10,
}: GetPostConfig = {}): Promise<Post[]> => {
  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/?offset=${offset}&limit=${limit}`;

  if (typeof query !== "undefined") {
    url += `&q=${query}`;
  }

  return fetch(url)
    .then(handleResponse)
    .then((posts) => {
      return Promise.all(posts.map(processPost));
    });
};

export const getPostsByMonth = (
  year: number | string,
  month: number | string
): Promise<Post[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${year}/${month}/`)
    .then(handleResponse)
    .then((posts) => {
      return Promise.all(posts.map(processPost));
    });

export const getPostsByTag = (tag: string): Promise<Post[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/tags/${tag}/`)
    .then(handleResponse)
    .then((posts) => {
      return Promise.all(posts.map(processPost));
    });

export const getPost = (pid: string): Promise<Post> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${pid}/`)
    .then(handleResponse)
    .then(processPost);

export const getSummary = (): Promise<Summary> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/summary/`).then(
    handleResponse
  );

export const getAutocomplete = (query: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/suggestions/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "text/plain",
    },
    body: query,
  }).then(handleResponse);
};
