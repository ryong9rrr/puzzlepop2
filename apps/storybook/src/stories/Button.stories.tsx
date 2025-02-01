import type { Meta, StoryObj } from "@storybook/react";
import "@puzzlepop2/react-components-button/style.css";
import { FoundationSize } from "@puzzlepop2/themes";
import { Button } from "@puzzlepop2/react-components-button";
import { Flex } from "@puzzlepop2/react-components-layout";

const foundationSizes: FoundationSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

const RenderStory = () => {
  return (
    <Flex direction="column" gap={2}>
      {foundationSizes.map(size => (
        <div key={size}>
          <Button size={size}>싱글게임</Button>
        </div>
      ))}
    </Flex>
  );
};

const meta = {
  title: "Story/Button",
  component: RenderStory,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
