import { ButtonHTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";

type ButtonVariant = "shadow" | "primary";

interface ButtonsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg" | "xl";

  isSelected?: boolean; // hover, active, focus 상태와 동일한 스타일을 가져야한다.
}

export default function Button(props: ButtonsProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    style,
    children,
    isSelected = false,
    ...rest
  } = props;

  return <button className={clsx("responsive-button-padding", className)}>{children}</button>;
}

const baseButtonStyle: CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "8px",
};

export const createShadowButtonStyle = ({ isSelected }: { isSelected: boolean }): CSSProperties => {
  return {
    ...baseButtonStyle,
    backgroundColor: `rgba(0, 0, 0, ${isSelected ? 0.7 : 0.2})`,
    color: isSelected ? "white" : "rgba(255, 255, 255, 0.6)",
  };
};
