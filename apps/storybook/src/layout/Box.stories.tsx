import type { Meta, StoryObj } from "@storybook/react";
import "@puzzlepop2/themes/themes.css";
import { Box } from "@puzzlepop2/react";

const RenderStory = () => {
  return (
    <Box
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: `blue`,
      }}
    >
      100 x 100 blue
    </Box>
  );
};

const meta = {
  title: "Layout/Box",
  component: RenderStory,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Box>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
