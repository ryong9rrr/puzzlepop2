import { ButtonHTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";
import { Text } from "../Text";
import { FoundationSize } from "@/theme/foundation/types";

type ButtonVariant = "shadow" | "primary";

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FoundationSize;
  variant?: ButtonVariant;

  isSelected?: boolean; // hover, active, focus 상태와 동일한 스타일을 가져야한다.
}

export const Button = (props: ButtonsProps) => {
  const {
    variant = "primary",
    size = "md",
    className,
    style,
    children,
    isSelected = true,
    ...rest
  } = props;

  return (
    <button
      className={clsx(styles.baseButton, `button-${size}`, className)}
      style={{ ...createShadowButtonStyle({ isSelected }), ...style }}
      {...rest}
    >
      <Text typography={size} style={{ lineHeight: 1 }}>
        {children}
      </Text>
    </button>
  );
};

export const createShadowButtonStyle = ({ isSelected }: { isSelected: boolean }): CSSProperties => {
  return {
    backgroundColor: `rgba(0, 0, 0, ${isSelected ? 0.7 : 0.2})`,
    color: isSelected ? "white" : "rgba(255, 255, 255, 0.6)",
  };
};
