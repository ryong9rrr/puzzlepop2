import Image from "next/image";
import { Z_INDEX } from "@puzzlepop2/themes";
import { usePuzzleStore } from "../stores/puzzleStore";

export const BackgroundPuzzle = () => {
  const { selectedPuzzle } = usePuzzleStore();

  // TODO: 더 나이스한 디폴트 배경화면 생각해보기...
  if (!selectedPuzzle) {
    return (
      <Image
        src="/backgrounds/default-puzzle-list.jpg"
        alt=""
        fill
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
          zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
          opacity: 0.4,
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        zIndex: Z_INDEX.BACKGROUND_Z_INDEX + 1,
      }}
    >
      <Image
        src={selectedPuzzle.src}
        alt=""
        fill
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          objectFit: "cover",
          zIndex: Z_INDEX.BACKGROUND_Z_INDEX,
          opacity: 0.4,
        }}
      />
    </div>
  );
};
