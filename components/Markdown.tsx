import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "highlight.js/styles/github.css";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export const options = {
  overrides: {},
};

export const defaultComponents = {
  h1: (props: any) => (
    <Typography {...props} gutterBottom variant="h5" component="h1" />
  ),
  h2: (props: any) => (
    <Typography {...props} gutterBottom variant="h6" component="h2" />
  ),
  h3: (props: any) => (
    <Typography {...props} gutterBottom variant="subtitle1" component="h3" />
  ),
  h4: (props: any) => (
    <Typography {...props} gutterBottom variant="caption" component="h4" />
  ),
  p: (props: any) => <Typography {...props} paragraph />,
  a: (props: any) => <Link {...props} rel="noreferrer" target="_blank" />,
  li: (props: any) => (
    <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />
  ),
  img: (props: any) => <img alt="image" {...props} width="100%" />,
  code: (props: any) => (
    <Box
      component="code"
      sx={{ bgcolor: grey[100], borderRadius: 1 }}
      {...props}
    />
  ),
};

export default function Markdown({ children, components }: any) {
  const [source, setSource] = useState<any>();
  useEffect(() => {
    serialize(children, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    }).then(setSource);
  }, [children]);
  return (
    source && (
      <MDXRemote {...source} components={components || defaultComponents} />
    )
  );
}
