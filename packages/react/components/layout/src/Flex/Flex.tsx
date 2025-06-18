import * as React from "react";
import { Box } from "../Box";
import { FlexProps } from "./types";

const _Flex = (props: FlexProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    as = "div",
    direction,
    justify,
    align,
    gap,
    basis,
    grow,
    shrink,
    wrap,
    style,
    children,

    gapScale,

    ...rest
  } = props;

  return (
    <Box
      as={as}
      ref={ref}
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: gapScale ? `${gapScale}rem` : gap,
        flexBasis: basis,
        flexGrow: grow,
        flexShrink: shrink,
        flexWrap: wrap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

const Flex = React.forwardRef(_Flex);
export { Flex };
