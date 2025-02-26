import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "@puzzlepop2/react-hooks-toast";
import { Button } from "@puzzlepop2/react-components-button";

const meta = {
  title: "Hooks/Toast",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const DefaultStory = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          payload: {
            message: "3초 뒤에 사라져요",
          },
        });
      }}
    >
      Click me
    </Button>
  );
};

const CustomStory = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          payload: {
            message: "1초 뒤에 사라지고, 스타일을 다시 정의할 수 있어요",
          },
          duration: 1000,
          style: {
            border: "3px solid blue",
          },
        });
      }}
    >
      Click me
    </Button>
  );
};

export const Default: Story = {
  render: () => {
    return (
      <ToastProvider>
        <DefaultStory />
      </ToastProvider>
    );
  },
};

export const Custom: Story = {
  render: () => {
    return (
      <ToastProvider>
        <CustomStory />
      </ToastProvider>
    );
  },
};
