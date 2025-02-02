import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@puzzlepop2/react-components-layout";

const meta = {
  title: "Layout/typography",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    typography: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Puzzle Pop!",
    typography: "md",
  },
};
