import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@puzzlepop2/react-components-button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["shadow", "solid", "outline"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
    color: {
      control: "select",
      options: ["orange", "lavender", "yellow"],
    },
    isDisabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "싱글게임",
    size: "md",
    variant: "solid",
    isDisabled: false,
  },
};
