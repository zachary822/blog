import styled from "@emotion/styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "highlight.js/styles/github.css";
import { MDXRemote } from "next-mdx-remote";
import { RefObject, useCallback, useRef } from "react";
import { toast } from "react-toastify";

export const options = {
  overrides: {},
};

const Copy = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
`;

const CopyButton = ({ text }: { text: RefObject<HTMLElement> }) => {
  const onClick = useCallback(() => {
    if (text.current) {
      navigator.clipboard.writeText(text.current.innerText.trim()).then(() => {
        toast.success("Copied!", { autoClose: 1000 });
      });
    }
  }, [text]);

  return (
    <Copy>
      <IconButton size="small" onClick={onClick}>
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Copy>
  );
};

const CodeBlock = ({ children, ...props }: any) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <Box
      sx={{ bgcolor: grey[100], borderRadius: 1, position: "relative" }}
      {...props}
      component="pre"
      ref={ref}
    >
      <CopyButton text={ref} />
      {children}
    </Box>
  );
};

const Code = (props: any) => (
  <Box
    component="code"
    sx={{ bgcolor: grey[100], borderRadius: 1, p: 0.2 }}
    {...props}
  />
);

const Img = styled.img`
  width: 100%;
`;

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
  img: (props: any) => <Img alt="image" {...props} />,
  code: Code,
  pre: CodeBlock,
};

export default function Markdown({ body, components }: any) {
  return <MDXRemote {...body} components={components || defaultComponents} />;
}
