import { style } from "@vanilla-extract/css";
import { DIMMED_Z_INDEX } from "../constants";

export const container = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: DIMMED_Z_INDEX,
});
