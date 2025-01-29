import React, { Ref } from "react";
import { AsElementProps } from "../types";

export type BoxProps = AsElementProps;

export const Box = React.forwardRef((props: BoxProps, ref: Ref<HTMLDivElement>) => {
  const { as = "div", children, ...rest } = props;

  return React.createElement(as, { ...rest, ref }, children);
});
Box.displayName = "Box";
