import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useQuery } from "react-query";
import { getSummary } from "../utils/api";
import Socials from "./Socials";

const socials = [
  { name: "GitHub", icon: GitHubIcon, url: "https://github.com/zachary822" },
  {
    name: "LinkedIn",
    icon: LinkedIn,
    url: "https://www.linkedin.com/in/zachary-juang/",
  },
];

export default function Sidebar() {
  const { data: archives = [] } = useQuery("summary", getSummary);
  const { t } = useTranslation();

  return (
    <Grid item xs={12} md={4}>
      <Paper
        elevation={0}
        sx={{ p: 2, bgcolor: "grey.200", color: "grey.500" }}
      >
        <Box sx={{ color: "text.primary" }}>
          <Typography variant="h6" gutterBottom>
            {t("About")}
          </Typography>
          <Typography>{t("description")}</Typography>
        </Box>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {t("Archives")}
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
      <Socials socials={socials} />
    </Grid>
  );
}
