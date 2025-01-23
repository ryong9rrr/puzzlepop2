import Image from "next/image";
import { CSSProperties, PropsWithChildren } from "react";

interface BackgroundProps extends PropsWithChildren {
  src: string;
  opacity?: number;
}

export default function Background(props: BackgroundProps) {
  const { src, children, opacity = 0.4 } = props;

  return (
    <div style={{ ...containerStyle }}>
      <Image style={{ ...imageStyle, opacity }} src={src} alt="" width={0} height={0} />
      {children}
    </div>
  );
}

const containerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100vh",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const imageStyle: CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  objectFit: "cover",
  zIndex: "var(--background-zindex)",
};
