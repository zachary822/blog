import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import type { ElementType } from "react";
import type { Archive } from "../utils/models";

interface SidebarProps {
  archives: Archive[];
  description: string;
  social: ReadonlyArray<{
    icon: ElementType;
    name: string;
    url: string;
  }>;
  title: string;
}

export default function Sidebar(props: SidebarProps) {
  const { archives, description, social, title } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>
      {archives.map((archive) => {
        const d = new Date(archive._id.year, archive._id.month, 1);

        return (
          <NextLink
            key={`${archive._id.year}_${archive._id.month}`}
            href={"#"}
            passHref
          >
            <Link display="block" variant="body1">
              {d.toLocaleString("default", { month: "long" })} {d.getFullYear()}
            </Link>
          </NextLink>
        );
      })}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
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
