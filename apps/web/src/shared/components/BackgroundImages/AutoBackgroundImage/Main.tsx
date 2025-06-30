import { PropsWithChildren } from "react";

export default function Main(props: PropsWithChildren) {
  const { children } = props;

  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {children}
    </main>
  );
}
