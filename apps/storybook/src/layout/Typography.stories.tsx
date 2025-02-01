import type { Meta, StoryObj } from "@storybook/react";
import { FoundationSize } from "@puzzlepop2/themes";
import { Flex, Text } from "@puzzlepop2/react-components-layout";

const foundationSizes: FoundationSize[] = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
];

const RenderStory = () => {
  return (
    <Flex direction="column" gap={2}>
      {foundationSizes.map(size => (
        <Text key={size} typography={size}>
          Puzzle Pop!
        </Text>
      ))}
    </Flex>
  );
};

const meta = {
  title: "Layout/typography",
  component: RenderStory,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
