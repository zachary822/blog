import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";
import NextLink from "next/link";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;

  return (
    <>
      <Toolbar
        sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}
      >
        <NextLink href="/" passHref>
          <Link
            component="a"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1, textDecoration: "none" }}
          >
            {title}
          </Link>
        </NextLink>
      </Toolbar>
    </>
  );
}
