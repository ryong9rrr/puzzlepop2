import { style } from "@vanilla-extract/css";
import { Z_INDEX, vars } from "@puzzlepop2/themes";

export const alertContainerStyle = style({
  boxSizing: "border-box",
  position: "absolute",
  padding: "16px 4px 4px 4px",
  border: `6px solid ${vars.colors.orange["50"]}`,
  borderRadius: "8px",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "hidden",

  zIndex: Z_INDEX.ALERT_Z_INDEX,
  width: "33%",
  backgroundColor: "#FAFAFA",
  boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
});
