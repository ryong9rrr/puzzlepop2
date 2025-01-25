import { CSSProperties } from "react";
import { Box, BoxProps } from "../Box";

interface FlexProps extends BoxProps {
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  gap?: number;
}

export const Flex = (props: FlexProps) => {
  const { direction, justify, align, style, children, gap, ...rest } = props;

  return (
    <Box
      style={{
        ...style,
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: gap ? `${gap}rem` : undefined,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
