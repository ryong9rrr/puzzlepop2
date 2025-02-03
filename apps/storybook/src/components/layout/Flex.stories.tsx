import type { Meta, StoryObj } from "@storybook/react";
import { Flex, FlexProps } from "@puzzlepop2/react-components-layout";

const RenderStory = (props: FlexProps) => {
  return (
    <Flex {...props}>
      <div style={{ backgroundColor: "lightblue" }}>첫째줄</div>
      <div style={{ backgroundColor: "lightyellow" }}>둘째줄</div>
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
  },
} satisfies Meta<typeof Flex>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
