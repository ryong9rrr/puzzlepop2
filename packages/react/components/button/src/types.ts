import { ButtonSize, vars } from "@puzzlepop2/themes";

export type ButtonProps = {
  variant?: "solid" | "outline" | "shadow";
  color?: keyof typeof vars.colors;
  size?: ButtonSize;
  isDisabled?: boolean;
  isPending?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">;
