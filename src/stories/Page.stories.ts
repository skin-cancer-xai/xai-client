import type { Meta, StoryObj } from "@storybook/react";

import Main from "../components/Main";

const meta: Meta<typeof Main> = {
  title: "Main",
  component: Main,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Main>;

export const Developer: Story = {
  args: {
    primary: true,
    label: "Anchor",
  },
};

export const Doctor: Story = {
  args: {
    label: "Anchor",
  },
};
