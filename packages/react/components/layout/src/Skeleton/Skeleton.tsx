import { Box } from "../Box";
import { SkeletonProps } from "./types";
import { skeleton } from "./style.css";

export const Skeleton = (props: SkeletonProps) => {
  const { width, height, style } = props;

  const _width = typeof width === "number" ? `${width}px` : width;
  const _height = typeof height === "number" ? `${height}px` : height;

  return (
    <Box className={skeleton} style={{ width: _width, height: _height, ...style }} {...props} />
  );
};
