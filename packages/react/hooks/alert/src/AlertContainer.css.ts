import { style } from "@vanilla-extract/css";
import { Z_INDEX, vars } from "@puzzlepop2/themes";

export const alertContainerStyle = style({
  boxSizing: "border-box",
  position: "absolute",
  padding: "0.6rem 0.2rem 0.2rem 0.2rem",
  border: `0.1rem solid ${vars.colors.orange["50"]}`,
  borderRadius: "0.3rem",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "hidden",

  zIndex: Z_INDEX.ALERT_Z_INDEX,
  width: "33%",
  backgroundColor: vars.colors.white,
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 0.2rem 0.6rem, rgba(17, 17, 26, 0.05) 0px 0.4rem 0.8rem",
});
