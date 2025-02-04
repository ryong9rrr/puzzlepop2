import { Box } from "../Box";
import { FlexProps } from "./types";

export const Flex = (props: FlexProps) => {
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
