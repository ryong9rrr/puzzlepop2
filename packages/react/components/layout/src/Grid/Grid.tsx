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

    gapScale,
    rowGapScale,
    columnGapScale,

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
        gridRow: row,
        gridTemplateAreas: templateAreas,
        gridTemplateColumns: templateColumns,
        gridTemplateRows: templateRows,
        rowGap: rowGapScale ? `${rowGapScale}rem` : rowGap,
        columnGap: columnGapScale ? `${columnGapScale}rem` : columnGap,
        gap: gapScale ? `${gapScale}rem` : gap,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
