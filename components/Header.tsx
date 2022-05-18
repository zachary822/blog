import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";

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
      </Toolbar>
    </>
  );
}
