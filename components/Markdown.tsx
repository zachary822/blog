import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import ReactMarkdown from "markdown-to-jsx";
import React, { useEffect, useRef } from "react";

function useHighlight() {
  const codeRef = useRef();

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  return codeRef;
}

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />;
}

function CodeBlock({ children }: any) {
  const codeRef = useHighlight();

  return (
    <Box
      component="pre"
      sx={{ bgcolor: grey[100], borderRadius: 1, padding: 1 }}
      ref={codeRef}
    >
      {children}
    </Box>
  );
}

function InlineCode({ children }: any) {
  const codeRef = useHighlight();

  return (
    <Box
      component="code"
      sx={{ bgcolor: grey[100], borderRadius: 1, paddingInline: 0.5 }}
      ref={codeRef}
    >
      {children}
    </Box>
  );
}

export const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h4",
        component: "h1",
      },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: "h6", component: "h2" },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: "subtitle1" },
    },
    h4: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "caption",
        paragraph: true,
      },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: {
      component: Link,
      props: {
        rel: "noreferrer",
      },
    },
    li: {
      component: MarkdownListItem,
    },
    img: {
      props: {
        width: "100%",
      },
    },
    pre: {
      component: CodeBlock,
    },
    code: {
      component: InlineCode,
    },
  },
};

export default function Markdown(props: any) {
  return <ReactMarkdown options={options} {...props} />;
}
