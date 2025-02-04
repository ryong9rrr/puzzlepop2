import { style, keyframes } from "@vanilla-extract/css";

const skeletonKeyframes = keyframes({
  "0%": {
    opacity: 1,
  },
  "50%": {
    opacity: 0.4,
  },
  "100%": {
    opacity: 1,
  },
});

export const skeleton = style({
  background: "#ddd",
  backgroundSize: "400% 100%",
  animation: `${skeletonKeyframes} 1.5s ease-in-out infinite`,
});
