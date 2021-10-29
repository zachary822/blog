import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: "body1" }} {...props} />;
}

const H1 = (props: any) => (
  <Typography gutterBottom variant="h4" component="h1" {...props} />
);
const H2 = (props: any) => (
  <Typography gutterBottom variant="h6" component="h2" {...props} />
);
const H3 = (props: any) => (
  <Typography gutterBottom variant="subtitle1" {...props} />
);
const H4 = (props: any) => (
  <Typography gutterBottom variant="caption" paragraph {...props} />
);
const Paragraph = (props: any) => <Typography paragraph {...props} />;

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  a: Link,
  li: MarkdownListItem,
};
