"use client";

import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar as CP, buildStyles } from "react-circular-progressbar";

import { useUserStore } from "../useUserStore";
import { useInGameUIStore } from "./useInGameUIStore";

export const CircularProgressbar = () => {
  const me = useUserStore(state => state.me);
  const redPercentage = useInGameUIStore(state => state.redPercentage);
  const bluePercentage = useInGameUIStore(state => state.bluePercentage);

  const percentage = Math.floor(me && me.team === "BLUE" ? bluePercentage : redPercentage);
  const color = me && me.team === "BLUE" ? `var(--blue-400)` : `var(--red-400)`;

  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        border: "1px solid #ccc",
      }}
    >
      <CP
        minValue={0}
        maxValue={100}
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={15}
        styles={buildStyles({
          // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
          strokeLinecap: "round",

          // Text size
          textSize: "24px",

          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.3,

          // Can specify path transition in more detail, or remove it entirely
          // pathTransition: 'none',

          // Colors
          pathColor: color,
          textColor: color,
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};
