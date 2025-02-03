import type { Meta, StoryObj } from "@storybook/react";
import { Box, Flex, FlexProps } from "@puzzlepop2/react-components-layout";

const RenderStory = (props: FlexProps) => {
  return (
    <Flex {...props}>
      <Box style={{ backgroundColor: "lightblue", width: "100px", height: "100px" }}>1</Box>
      <Box style={{ backgroundColor: "lightyellow", width: "100px", height: "100px" }}>2</Box>
      <Box style={{ backgroundColor: "lightgreen", width: "100px", height: "100px" }}>3</Box>
      <Box style={{ backgroundColor: "tomato", width: "100px", height: "100px" }}>4</Box>
      <Box style={{ backgroundColor: "gray", width: "100px", height: "100px" }}>5</Box>
      <Box style={{ backgroundColor: "purple", width: "100px", height: "100px" }}>6</Box>
    </Flex>
  );
};

const meta = {
  title: "Components/Layout/Flex",
  component: RenderStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
    },
    justify: {
      control: "select",
      options: ["flex-start", "center", "flex-end", "space-between", "space-around"],
    },
    align: {
      control: "select",
      options: ["flex-start", "center", "flex-end", "stretch"],
    },
    gap: {
      description: "px 단위로 동작합니다.",
      control: "number",
      min: 0,
      step: 1,
    },
    basis: {
      control: "text",
    },
    grow: {
      control: "number",
      min: 0,
      step: 1,
    },
    shrink: {
      control: "number",
      min: 0,
      step: 1,
    },
    wrap: {
      control: "select",
      options: ["nowrap", "wrap", "wrap-reverse"],
    },
  },
} satisfies Meta<typeof Flex>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
