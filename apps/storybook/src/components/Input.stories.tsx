import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@puzzlepop2/react-components-input";
import { Flex } from "@puzzlepop2/react-components-layout";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Flex gap={10} direction="column">
        <div>
          <Input color="orange" placeholder="orange" />
        </div>
        <div>
          <Input color="lavender" placeholder="lavender" />
        </div>
        <div>
          <Input color="yellow" placeholder="yellow" />
        </div>
        <div>
          <Input color="blue" placeholder="blue" />
        </div>
        <div>
          <Input color="green" placeholder="green" />
        </div>
      </Flex>
    );
  },
};
