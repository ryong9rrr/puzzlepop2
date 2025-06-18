import { InputHTMLAttributes } from "react";
import { vars } from "@puzzlepop2/themes";

export type InputProps = {
  color?: keyof typeof vars.colors;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "color" | "size">;
