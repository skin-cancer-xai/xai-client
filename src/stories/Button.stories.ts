import type { Meta, StoryObj } from "@storybook/react";

import Button from "../components/Button";
import "../styles/button.css";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: "primary",
    label: "button",
    backgroundColor: "#2b3467",
  },
};

export const Secondary: Story = {
  args: {
    primary: "secondary",
    label: "button",
    backgroundColor: "#bad7e9",
  },
};

export const Sub: Story = {
  args: {
    primary: "sub",
    label: "button",
    backgroundColor: "#bad7e9",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "button",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    label: "button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "button",
  },
};

export const XSmall: Story = {
  args: {
    size: "xsmall",
    label: "button",
  },
};

export const InActive: Story = {
  args: {
    active: false,
    label: "inactive",
    size: "xsmall",
  },
};
