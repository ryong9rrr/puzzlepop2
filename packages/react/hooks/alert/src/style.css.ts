import { style } from "@vanilla-extract/css";
import { Z_INDEX } from "@puzzlepop2/themes";

export const alertContainerStyle = style({
  boxSizing: "border-box",
  position: "absolute",
  padding: "16px",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "8px",
  overflow: "hidden",

  zIndex: Z_INDEX.ALERT_Z_INDEX,
  width: "33%",
  backgroundColor: "#FAFAFA",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
});
