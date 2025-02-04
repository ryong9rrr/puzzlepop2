import { GridItemProps } from "./types";
import { Box } from "../Box";

export const GridItem = (props: GridItemProps) => {
  const {
    as = "div",
    area,
    columnEnd,
    columnStart,
    column,
    rowEnd,
    rowStart,
    row,
    style,
    children,
    ...rest
  } = props;

  return (
    <Box
      as={as}
      style={{
        display: "grid",
        gridArea: area,
        gridColumnEnd: columnEnd,
        gridColumnStart: columnStart,
        gridColumn: column,
        gridRowEnd: rowEnd,
        gridRowStart: rowStart,
        gridRow: row,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
