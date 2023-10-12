import styled from "@emotion/styled";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import "highlight.js/styles/github.css";
import mermaid from "mermaid";
import {
  ComponentProps,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import MarkdownCompiler, { MarkdownToJSX } from "markdown-to-jsx";
import hljs from "highlight.js/lib/core";

const LANGUAGES = [
  "python",
  "python-repl",
  "typescript",
  "javascript",
  "shell",
  "haskell",
];

hljs.registerLanguage("python", require("highlight.js/lib/languages/python"));
hljs.registerLanguage(
  "python-repl",
  require("highlight.js/lib/languages/python-repl"),
);
hljs.registerLanguage(
  "typescript",
  require("highlight.js/lib/languages/typescript"),
);
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript"),
);
hljs.registerLanguage("shell", require("highlight.js/lib/languages/shell"));
hljs.registerLanguage("haskell", require("highlight.js/lib/languages/haskell"));

hljs.registerAliases("js", { languageName: "javascript" });
hljs.registerAliases("sh", { languageName: "shell" });

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
  const [code, setCode] = useState<ComponentProps<typeof Box>>();

  useEffect(() => {
    if (
      className &&
      className.startsWith("lang-") &&
      typeof children === "string"
    ) {
      const language = className.replace(/lang-/, "");
      if (language === "mermaid") {
        const type = mermaid.detectType(children);
        mermaid.render(type, children).then(({ svg }) => {
          setCode({
            dangerouslySetInnerHTML: {
              __html: svg,
            },
          });
        });
        return;
      }
      if (!LANGUAGES.includes(language)) {
        setCode({ children });
        return;
      }
      try {
        setCode({
          dangerouslySetInnerHTML: {
            __html: hljs.highlight(children, { language }).value,
          },
        });
        return;
      } catch (e) {
        /* empty */
      }
    }
    setCode({ children });
    return;
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
      mb: 2,
    },
  },
  h2: {
    component: Typography,
    props: {
      variant: "h5",
      component: "h2",
      mb: 2,
    },
  },
  h3: {
    component: Typography,
    props: {
      variant: "h5",
      component: "h3",
      mb: 2,
    },
  },
  h4: {
    component: Typography,
    props: {
      variant: "h5",
      component: "h4",
      mb: 2,
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
      sx: { mb: 1, typography: "body1" },
    },
  },
  ol: {
    component: Box,
    props: {
      component: "ol",
      sx: { m: 0, typography: "body1" },
    },
  },
  ul: {
    component: Box,
    props: {
      component: "ul",
      sx: { m: 0, typography: "body1" },
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
