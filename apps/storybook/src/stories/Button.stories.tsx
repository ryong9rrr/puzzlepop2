import type { Meta, StoryObj } from "@storybook/react";
import "@puzzlepop2/react-components-button/style.css";
import { Button } from "@puzzlepop2/react-components-button";

const meta = {
  title: "Story/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["shadow"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "싱글게임",
    size: "md",
    variant: "shadow",
  },
};
