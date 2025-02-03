import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@puzzlepop2/react-components-layout";

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
  title: "Components/Layout/Box",
  component: RenderStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Box>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
