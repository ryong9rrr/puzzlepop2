import { Box } from "../Box";
import { skeleton } from "./style.css";
import { SkeletonCircleProps } from "./types";

export const SkeletonCircle = (props: SkeletonCircleProps) => {
  const { size } = props;

  const width = typeof size === "string" ? size : `${size}px`;

  return (
    <Box className={skeleton} style={{ borderRadius: "50%", width, height: width }} {...props} />
  );
};
