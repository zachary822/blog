import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Socials from "./Socials";

export default {
  component: Socials,
} as ComponentMeta<typeof Socials>;

const Template: ComponentStory<typeof Socials> = (args) => (
  <Socials {...args} />
);

export const FirstStory = Template.bind({});

FirstStory.args = {
  socials: [
    { name: "GitHub", icon: GitHubIcon, url: "https://github.com/zachary822" },
    {
      name: "LinkedIn",
      icon: LinkedIn,
      url: "https://www.linkedin.com/in/zachary-juang/",
    },
  ],
};
