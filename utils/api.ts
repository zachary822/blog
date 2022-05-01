import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Archive, Post, RawPost } from "./models";

const handleResponse = (res: Response) => {
  if (!res.ok) {
    throw new Error(`${res.statusText}`);
  }
  return res.json();
};

const processPost = (post: RawPost) => {
  return Promise.all([
    Promise.resolve(post),
    serialize(post.body, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    }),
  ]).then(([post, body]) => ({ ...post, body }));
};

export const getPosts = (offset = 0, limit = 10): Promise<Post[]> =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/?offset=${offset}&limit=${limit}`
  )
    .then(handleResponse)
    .then((posts) => {
      return Promise.all(posts.map(processPost));
    });

export const getPostsByMonth = (
  year: number | string,
  month: number | string
): Promise<Post[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${year}/${month}/`)
    .then(handleResponse)
    .then((posts) => {
      return Promise.all(posts.map(processPost));
    });

export const getPost = (pid: string): Promise<Post> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${pid}/`)
    .then(handleResponse)
    .then(processPost);

export const getSummary = (): Promise<Archive[]> =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/summary/`).then(
    handleResponse
  );
