import { style } from "@vanilla-extract/css";

export const container = style({
  flex: 1,
  overflow: "hidden",
  lineHeight: "1.1rem",
});

export const text = style({
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
});
