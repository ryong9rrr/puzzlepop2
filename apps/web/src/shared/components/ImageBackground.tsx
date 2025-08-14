import Image from "next/image";
import { Z_INDEX } from "@puzzlepop2/themes";

export const ImageBackground = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt=""
      priority
      width={0}
      height={0}
      unoptimized
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",

        zIndex: Z_INDEX.BACKGROUND_Z_INDEX - 1,
        opacity: 0.4,
        objectFit: "cover",
        pointerEvents: "none",
      }}
    />
  );
};
