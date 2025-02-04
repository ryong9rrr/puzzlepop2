import type { Meta, StoryObj } from "@storybook/react";
import { Flex, Skeleton, SkeletonCircle } from "@puzzlepop2/react-components-layout";

const meta = {
  title: "Components/Layout/Skeleton",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <>
        <Flex direction="column" gap={16}>
          <Skeleton width={100} height={100} />
          <SkeletonCircle size={40} />
          <Skeleton width={300} height={30} />
        </Flex>
      </>
    );
  },
};
