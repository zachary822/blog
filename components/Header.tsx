import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
      </Toolbar>
    </>
  );
}
