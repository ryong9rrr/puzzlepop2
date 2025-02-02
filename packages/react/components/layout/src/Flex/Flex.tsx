import { BoxProps, Box } from "../Box";

export type FlexProps = {
  direction?: React.CSSProperties["flexDirection"];
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  gap?: number;
} & BoxProps;

export const Flex = (props: FlexProps) => {
  const { direction, justify, align, style, children, gap, ...rest } = props;

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        gap: gap ? `${gap}px` : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
