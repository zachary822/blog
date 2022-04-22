import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NextLink from "next/link";
import SvgIcon from "@mui/material/SvgIcon";

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
    </>
  );
}
