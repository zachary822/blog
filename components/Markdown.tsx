import styled from "@emotion/styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "highlight.js/styles/github.css";
import { ComponentProps, RefObject, useCallback, useMemo, useRef } from "react";
import { toast } from "react-toastify";
import MarkdownCompiler, { MarkdownToJSX } from "markdown-to-jsx";
import hljs from "highlight.js";

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

const CodeBlock = ({ children, ...props }: ComponentProps<typeof Box>) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <Box
      sx={{ bgcolor: grey[100], borderRadius: 1, position: "relative", p: 2 }}
      {...props}
      component="pre"
      ref={ref}
    >
      <CopyButton text={ref} />
      {children}
    </Box>
  );
};

const Code = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Box>) => {
  const code = useMemo(() => {
    if (
      className &&
      className.startsWith("lang-") &&
      typeof children === "string"
    ) {
      const language = className.replace(/lang-/, "");
      return {
        dangerouslySetInnerHTML: {
          __html: hljs.highlight(children, { language }).value,
        },
      };
    }
    return { children };
  }, [className, children]);

  return (
    <Box
      component="code"
      sx={{
        bgcolor: `${grey[100]} !important`,
        borderRadius: 1,
        p: 0.2,
      }}
      {...props}
      {...code}
    />
  );
};

const Img = styled.img`
  width: 100%;
`;

export const defaultOverrides = {
  h1: {
    component: Typography,
    props: {
      variant: "h5",
      component: "h1",
    },
  },
  h2: {
    component: Typography,
    props: {
      variant: "h5",
      component: "h2",
    },
  },
  h3: {
    component: Typography,
    props: {
      variant: "h5",
      component: "h3",
    },
  },
  h4: {
    component: Typography,
    props: {
      variant: "h5",
      component: "h4",
    },
  },
  p: {
    component: Typography,
    props: {
      paragraph: true,
    },
  },
  a: {
    component: Link,
    props: {
      rel: "noreferrer",
      target: "_blank",
    },
  },
  img: {
    component: Img,
  },
  pre: {
    component: CodeBlock,
  },
  code: {
    component: Code,
  },
  li: {
    component: Box,
    props: {
      component: "li",
      sx: { mt: 1, typography: "body1" },
    },
  },
};

export default function Markdown({
  body,
  overrides,
}: {
  body: string;
  iframes?: boolean;
  overrides?: MarkdownToJSX.Overrides;
}) {
  return (
    <MarkdownCompiler
      options={{
        overrides: { ...defaultOverrides, ...overrides },
      }}
    >
      {body}
    </MarkdownCompiler>
  );
}
