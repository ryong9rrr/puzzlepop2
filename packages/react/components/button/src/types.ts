import { FoundationSize, vars } from "@puzzlepop2/themes";

export type ButtonProps = {
  variant?: "solid" | "outline" | "shadow";
  color?: keyof typeof vars.colors;
  size?: FoundationSize; // 3xl~6xl까지는 사용하지 않음.
  isDisabled?: boolean;
  isPending?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">;
