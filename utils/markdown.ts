import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export const serializeMarkdown = (
  text: string
): Promise<MDXRemoteSerializeResult> =>
  serialize(text, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
    },
  });
