"use client";

import { SetStateAction } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";

interface Props {
  value: number;
  setValue: (value: SetStateAction<number>) => void;
}

const MIN_ROOM_SIZE = 1;
const MAX_ROOM_SIZE = 8;

export const RoomSizeField = (props: Props) => {
  const { value, setValue } = props;

  const onMinus = () => {
    setValue(prev => Math.max(prev - 1, MIN_ROOM_SIZE));
  };

  const onPlus = () => {
    setValue(prev => Math.min(prev + 1, MAX_ROOM_SIZE));
  };

  return (
    <div>
      <Text bold className="font-gameTitle">
        최대정원
      </Text>
      <Spacing size={8} />
      <Flex justify="center" align="center">
        <CountRoundedButton variant="minus" onClick={onMinus} disabled={value <= MIN_ROOM_SIZE} />
        <Flex justify="center" align="center" style={{ width: "2.5rem" }}>
          <Text bold size="sm">
            {value}명
          </Text>
        </Flex>
        <CountRoundedButton variant="plus" onClick={onPlus} disabled={value >= MAX_ROOM_SIZE} />
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
