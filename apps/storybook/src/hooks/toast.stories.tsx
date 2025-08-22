import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "@puzzlepop2/react-hooks-toast";
import { Button } from "@puzzlepop2/react-components-button";
import { vars } from "@puzzlepop2/themes";

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
      기본 토스트
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
            backgroundColor: vars.colors.grey[50],
            border: `2px solid ${vars.colors.grey[300]}`,
          },
        });
      }}
    >
      커스텀 토스트
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
