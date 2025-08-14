import { vars } from "@puzzlepop2/themes";
import { style } from "@vanilla-extract/css";

export const tag = style({
  backgroundColor: vars.colors.lavender[400],
  color: vars.colors.white,
  transition: "background-color 0.2s ease",

  selectors: {
    "&:hover": {
      backgroundColor: vars.colors.lavender[700],
    },
  },
});

export const tagMore = style({
  color: vars.colors.lavender[700],
  fontWeight: 800,
});
