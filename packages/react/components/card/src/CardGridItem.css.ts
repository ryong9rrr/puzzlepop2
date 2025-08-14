import { vars } from "@puzzlepop2/themes";
import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",

  boxSizing: "border-box",
  padding: "0.4rem 0.4rem 0.6rem 0.4rem",
  border: `3px solid ${vars.colors.grey[200]}`,
  borderRadius: "0.4rem",
  cursor: "pointer",
  backgroundColor: vars.colors.white,

  transition: "transform 0.2s ease-in-out",

  selectors: {
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
});

export const notAllowed = style({
  transition: "none",
  cursor: "not-allowed",
  opacity: 0.5,
  selectors: {
    "&:hover": {
      transform: "none",
    },
  },
});
