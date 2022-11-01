import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import NextLink from "next/link";

interface Social {
  name: string;
  icon: typeof SvgIcon;
  url: string;
}

interface SocialsProps {
  socials: Social[];
}

export default function Socials({ socials }: SocialsProps) {
  return (
    <>
      {socials.map((network) => (
        <Link
          key={network.name}
          display="block"
          variant="body1"
          component={NextLink}
          target={"_blank"}
          href={network.url}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </>
  );
}
