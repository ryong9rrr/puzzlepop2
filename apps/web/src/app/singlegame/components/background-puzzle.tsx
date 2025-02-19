import Image from "next/image";
import { Z_INDEX } from "@puzzlepop2/themes";
import { useSingleGamePage } from "../store";

// TODO: 더 나이스한 디폴트 배경화면 생각해보기...
const DEFAULT_BACKGROUND = "/backgrounds/default-puzzle-list.jpg";

export const BackgroundPuzzle = () => {
  const { selectedPuzzle } = useSingleGamePage();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: selectedPuzzle ? "rgba(0, 0, 0, 0.5)" : "inherit",
        width: "100%",
        height: "100vh",
        zIndex: Z_INDEX.BACKGROUND_Z_INDEX + 1,
      }}
    >
      <Image
        src={selectedPuzzle ? selectedPuzzle.src : DEFAULT_BACKGROUND}
        alt=""
        fill
        style={{
          objectFit: "cover",
          zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
          opacity: 0.4,
        }}
      />
    </div>
  );
};
