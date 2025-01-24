import { CSSProperties, HTMLAttributes } from "react";

export default function Dimmed(props: HTMLAttributes<HTMLDivElement>) {
  const { style, children, ...rest } = props;

  return (
    <div style={{ ...style, ...containerStyle }} {...rest}>
      {children}
    </div>
  );
}

const containerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: "var(--dimmed-zindex)",
};
