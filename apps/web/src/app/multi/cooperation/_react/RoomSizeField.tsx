"use client";

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { Button } from "@puzzlepop2/react-components-button";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";

interface Props {
  onDecrease: () => void;
  onIncrease: () => void;
  roomSize: number;
  isDisabledDecrease: boolean;
  isDisabledIncrease: boolean;
}

export const RoomSizeField = (props: Props) => {
  const { onDecrease, onIncrease, roomSize, isDisabledDecrease, isDisabledIncrease } = props;

  return (
    <div>
      <Text bold className="font-gameTitle">
        최대정원
      </Text>
      <Spacing size={8} />
      <Flex justify="center" align="center">
        <CountRoundedButton variant="minus" onClick={onDecrease} disabled={isDisabledDecrease} />
        <Flex justify="center" align="center" style={{ width: "2.5rem" }}>
          <Text bold size="sm">
            {roomSize}명
          </Text>
        </Flex>
        <CountRoundedButton variant="plus" onClick={onIncrease} disabled={isDisabledIncrease} />
      </Flex>
    </div>
  );
};

interface CountRoundedButtonProps {
  variant: "minus" | "plus";
  onClick: () => void;
  disabled: boolean;
}

const CountRoundedButton = (props: CountRoundedButtonProps) => {
  const { onClick, variant, disabled = false } = props;

  return (
    <span>
      <Button
        type="button"
        size="xs"
        onClick={onClick}
        isDisabled={disabled}
        style={{ display: "inline-flex", borderRadius: "50%", position: "relative" }}
      >
        -
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "57%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {variant === "plus" ? <FaPlus /> : <FaMinus />}
        </div>
      </Button>
    </span>
  );
};
