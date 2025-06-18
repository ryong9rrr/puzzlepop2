import { PropsWithChildren } from "react";

export const Main = (props: PropsWithChildren) => {
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
};
