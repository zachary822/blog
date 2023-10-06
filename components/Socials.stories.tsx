import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { Meta, StoryObj } from "@storybook/react";
import Socials from "./Socials";

const meta: Meta<typeof Socials> = {
  component: Socials,
};

export default meta;

type Story = StoryObj<typeof Socials>;

export const FirstStory: Story = {
  args: {
    socials: [
      {
        name: "GitHub",
        icon: GitHubIcon,
        url: "https://github.com/zachary822",
      },
      {
        name: "LinkedIn",
        icon: LinkedIn,
        url: "https://www.linkedin.com/in/zachary-juang/",
      },
    ],
  },
};
