import { CSSProperties, HTMLAttributes } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: CSSProperties["flexDirection"];
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
}

export default function Flex(props: FlexProps) {
  const { direction, justify, align, style, children, ...rest } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
