import { vars } from "@puzzlepop2/themes";
import { CANVAS_HEIGHT, CANVAS_ID, CANVAS_WIDTH, GameMode, IMG_ID } from "@puzzlepop2/game-core";
import { SinglegameLoader } from "./singlegame/SinglegameLoader";
import { BaseEngineProps } from "../engines/base/types";

export type GameClientProps = {
  mode: GameMode;
} & BaseEngineProps;

export const GameClient = (props: GameClientProps) => {
  const { src, gameLevel, mode } = props;

  const renderGameLoader = () => {
    if (mode === "single") {
      return <SinglegameLoader gameLevel={gameLevel} src={src} />;
    }

    // TODO: 추후 멀티게임 추가
    return null;
  };

  return (
    <>
      <img id={IMG_ID} src={src} style={{ display: "none" }} />
      <canvas
        id={CANVAS_ID}
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          backgroundColor: vars.colors.grey["200"],
        }}
      ></canvas>
      {renderGameLoader()}
    </>
  );
};
