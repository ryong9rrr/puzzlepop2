import React, { Ref } from "react";
import { AsElementProps } from "@/shared/core/types";

export type BoxProps = AsElementProps;

const Box = (props: BoxProps, ref: Ref<HTMLDivElement>) => {
  const { as = "div", children, ...rest } = props;

  return React.createElement(as, { ...rest, ref }, children);
};

const _Box = React.forwardRef(Box);
export { _Box as Box };
