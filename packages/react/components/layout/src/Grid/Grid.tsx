import * as React from "react";
import { GridProps } from "./types";
import { Box } from "../Box";

const _Grid = (props: GridProps, ref: React.Ref<HTMLDivElement>) => {
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
      ref={ref}
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

const Grid = React.forwardRef(_Grid);
export { Grid };
