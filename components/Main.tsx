// @ts-ignore
import { MDXProvider } from "@mdx-js/react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { components } from "./Markdown";

interface MainProps {
  posts: ReadonlyArray<any>;
  title: string;
}

export default function Main(props: MainProps) {
  const { posts, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <MDXProvider components={components}>
        {posts.map((Post, i) => (
          <Post key={i} />
        ))}
      </MDXProvider>
    </Grid>
  );
}
