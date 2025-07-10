import { BoxProps } from "../Box";

export type SkeletonProps = {
  width?: number | string;
  height?: number | string;
} & BoxProps;

export type SkeletonCircleProps = {
  size?: number | string;
} & BoxProps;
