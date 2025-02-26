import { keyframes, style } from "@vanilla-extract/css";
import { vars, Z_INDEX } from "@puzzlepop2/themes";

export const toastContainerStyle = style({
  position: "fixed",
  width: "100%",
  top: 0,
  left: 0,

  display: "flex",
  justifyContent: "center",

  pointerEvents: "none",
  zIndex: Z_INDEX.TOAST_Z_INDEX,
});

const slideDown = keyframes({
  to: {
    transform: "translateY(0)",
  },
});

export const toastStyle = style({
  marginTop: "0.5rem",
  width: "80%",
  border: `0.1rem solid ${vars.colors.orange["200"]}`,
  borderRadius: "0.25rem",

  backgroundColor: vars.colors.orange["50"],
  padding: "0.5rem 0.75rem",
  color: vars.colors.grey["900"],
  textAlign: "center",

  transform: "translateY(-100%)",
  animation: `${slideDown} 0.4s ease-in-out forwards`,
});
