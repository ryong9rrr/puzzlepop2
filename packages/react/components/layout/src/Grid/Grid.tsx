import { GridProps } from "./types";
import { Box } from "../Box";

export const Grid = (props: GridProps) => {
  const {
    as = "div",
    autoColumns,
    autoFlow,
    autoRows,
    columns,
    columnGap,
    gap,
    row,
    rowGap,
    templateAreas,
    templateColumns,
    templateRows,
    style,
    children,
    ...rest
  } = props;

  return (
    <Box
      as={as}
      style={{
        display: "grid",
        gridAutoColumns: autoColumns,
        gridAutoFlow: autoFlow,
        gridAutoRows: autoRows,
        gridColumn: columns,
        columnGap,
        gap,
        gridRow: row,
        rowGap,
        gridTemplateAreas: templateAreas,
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
