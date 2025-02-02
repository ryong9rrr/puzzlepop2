import { FoundationSize } from "@puzzlepop2/themes";

export type ButtonProps = {
  variant?: "shadow";
  //variant?: "solid" | "outline" | "shadow";
  color?: string;
  size?: FoundationSize;
  isDisabled?: boolean;
  isPending?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">;
