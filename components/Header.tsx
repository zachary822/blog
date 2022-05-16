import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import Search from "./Search";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <>
      <Toolbar
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          marginBottom: 1,
          justifyContent: "center",
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: { xs: 3, md: 1 } }}
        >
          <NextLink href="/" passHref>
            <Link color="inherit" noWrap sx={{ textDecoration: "none" }}>
              {title}
            </Link>
          </NextLink>
        </Typography>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "end" }}>
          <Search />
        </Box>
      </Toolbar>
    </>
  );
}
