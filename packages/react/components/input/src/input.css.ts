import { createVar, style } from "@vanilla-extract/css";
import { vars } from "@puzzlepop2/themes";

export const focusColorVariant = createVar();

export const inputStyle = style({
  margin: 0,
  padding: "0.125rem 0.5rem",
  width: "100%",

  fontSize: "0.8rem",
  fontWeight: 500,
  height: "1.8rem",

  border: `3px solid ${vars.colors.grey[500]}`,
  borderRadius: "0.125rem",

  boxSizing: "border-box",

  transition: "border-color 0.2s ease-in-out",

  // @ts-ignore
  "&:focus": {
    outline: "none",
    borderColor: focusColorVariant,
  },
});
