import { FoundationSize } from "@puzzlepop2/themes";

export type ButtonProps = {
  variant?: "solid" | "outline" | "shadow";
  color?: string;
  size?: FoundationSize;
  isDisabled?: boolean;
  isPending?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
