import type { Meta, StoryObj } from "@storybook/react";
import "@puzzlepop2/themes/themes.css";
import { Box } from "@puzzlepop2/react";

const BoxStories = () => {
  return (
    <div style={{ display: "flex" }}>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-50)" }}>
        orange50
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-100)" }}>
        orange100
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-200)" }}>
        orange200
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-300)" }}>
        orange300
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-400)" }}>
        orange400
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-500)" }}>
        orange500
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-600)" }}>
        orange600
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-700)" }}>
        orange700
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-800)" }}>
        orange800
      </Box>
      <Box style={{ width: "100px", height: "100px", backgroundColor: "var(--orange-900)" }}>
        orange900
      </Box>
    </div>
  );
};

const meta = {
  title: "Foundation/themes",
  component: BoxStories,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {};
