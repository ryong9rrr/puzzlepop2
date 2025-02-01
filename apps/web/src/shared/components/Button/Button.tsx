import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";
import { FoundationSize } from "@puzzlepop2/themes";
import { Text } from "@puzzlepop2/react";

type ButtonVariant = "shadow" | "primary";

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: FoundationSize;
  variant?: ButtonVariant;

  isSelected?: boolean;
}

export const Button = (props: ButtonsProps) => {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    isSelected = false,
    ...rest
  } = props;

  return (
    <button
      className={clsx(
        className,
        styles.baseButton,
        styles[variant],
        `button-${size}`,
        isSelected && styles.isSelected,
      )}
      {...rest}
    >
      <Text typography={size} style={{ lineHeight: 1 }}>
        {children}
      </Text>
    </button>
  );
};
