import GitHubIcon from "@mui/icons-material/GitHub";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NextLink from "next/link";
import { useQuery } from "react-query";
import { getSummary } from "../utils/api";

const sidebar = {
  description: "Test blog that uses MongoDB document with markdown content.",
  social: [
    { name: "GitHub", icon: GitHubIcon, url: "https://github.com/zachary822" },
  ],
};

export default function Sidebar() {
  const { description, social } = sidebar;
  const { data: archives = [] } = useQuery("summary", getSummary);

  return (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={0}
        sx={{ p: 2, bgcolor: "grey.200", color: "grey.500" }}
      >
        <Box sx={{ color: "text.primary" }}>
          <Typography variant="h6" gutterBottom>
            About
          </Typography>
          <Typography>{description}</Typography>
        </Box>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>
      {archives.map((archive) => {
        const d = new Date(archive._id.year, archive._id.month - 1, 1);

        return (
          <NextLink
            key={`${archive._id.year}_${archive._id.month}`}
            href={`/posts/${archive._id.year}/${archive._id.month}`}
            passHref
          >
            <Link display="block" variant="body1">
              {d.toLocaleString("default", { month: "long" })} {d.getFullYear()}{" "}
              ({archive.count})
            </Link>
          </NextLink>
        );
      })}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Socials
      </Typography>
      {social.map((network) => (
        <NextLink key={network.name} href={network.url} passHref>
          <Link
            display="block"
            variant="body1"
            target={"_blank"}
            sx={{ mb: 0.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <network.icon />
              <span>{network.name}</span>
            </Stack>
          </Link>
        </NextLink>
      ))}
    </Grid>
  );
}
