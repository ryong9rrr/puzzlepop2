import { BoxProps, Box } from "../Box";

export type FlexProps = {
  direction?: React.CSSProperties["flexDirection"];
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  basis?: React.CSSProperties["flexBasis"];
  grow?: React.CSSProperties["flexGrow"];
  shrink?: React.CSSProperties["flexShrink"];
  wrap?: React.CSSProperties["flexWrap"];
  gap?: number;
} & BoxProps;

export const Flex = (props: FlexProps) => {
  const { direction, justify, align, gap, basis, grow, shrink, wrap, style, children, ...rest } =
    props;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: gap ? `${gap}px` : undefined,
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
