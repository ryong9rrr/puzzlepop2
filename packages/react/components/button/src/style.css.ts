import { style } from "@vanilla-extract/css";

export const baseButtonStyle = style({
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  outline: "none",
});
