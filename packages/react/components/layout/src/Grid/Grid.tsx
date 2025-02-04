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
        columnGap: columnGapScale ? `${columnGapScale}rem` : columnGap,
        gap: gapScale ? `${gapScale}rem` : gap,
        gridRow: row,
        rowGap: rowGapScale ? `${rowGapScale}rem` : rowGap,
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
