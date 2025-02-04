import { Box } from "../Box";
import { skeleton } from "./style.css";
import { SkeletonCircleProps } from "./types";

export const SkeletonCircle = (props: SkeletonCircleProps) => {
  const { size } = props;

  return (
    <Box
      className={skeleton}
      style={{ borderRadius: "50%", width: `${size}px`, height: `${size}px` }}
      {...props}
    />
  );
};
