import { PropsWithChildren, CSSProperties } from "react";
import { Grid } from "@puzzlepop2/react-components-layout";

interface Props extends PropsWithChildren {
  className?: string;
  style?: CSSProperties;
}

export const CardGridContainer = (props: Props) => {
  const { children, className = "", style = {} } = props;

  return (
    <Grid
      className={className}
      templateColumns="repeat(2, 1fr)"
      gapScale={1}
      style={{ boxSizing: "border-box", ...style }}
    >
      {children}
    </Grid>
  );
};
