import { style } from "@vanilla-extract/css";
import { Z_INDEX } from "@puzzlepop2/themes";

export const container = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: Z_INDEX.DIMMED_Z_INDEX,
});
