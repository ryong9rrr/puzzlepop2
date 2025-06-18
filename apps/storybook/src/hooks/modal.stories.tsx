import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ModalProvider, useModal } from "@puzzlepop2/react-hooks-modal";
import { Flex, Spacing } from "@puzzlepop2/react-components-layout";

const meta = {
  title: "Hooks/Modal",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

const WhenNoOptions = () => {
  const { open } = useModal();

  const [closeOnEscKey, setCloseOnEscKey] = useState(false);
  const [closeOnOutsideClick, setCloseOnOutsideClick] = useState(false);

  return (
    <Flex direction="column" gap={20}>
      <Flex direction="row" gap={10}>
        <button onClick={() => setCloseOnEscKey(prev => !prev)}>
          closeOnEscKey : {String(closeOnEscKey)}
        </button>
        <button onClick={() => setCloseOnOutsideClick(prev => !prev)}>
          closeOnOutsideClick : {String(closeOnOutsideClick)}
        </button>
      </Flex>
      <Spacing size={20} />
      <button
        onClick={() => {
          open({
            component: <div>다른 옵션도 살펴보세요</div>,
            options: {
              closeOnEscKey,
              closeOnOutsideClick,
            },
          });
        }}
      >
        이 버튼을 누르면 모달이 떠요
      </button>
    </Flex>
  );
};

export const Default: Story = {
  render: () => {
    return (
      <ModalProvider>
        <WhenNoOptions />
      </ModalProvider>
    );
  },
};
