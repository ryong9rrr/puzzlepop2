import Paper from "paper";
import { Piece } from "@puzzlepop2/game-core";
import { BaseEngine } from "../base/Base";
import { FetchedData } from "../base/types";
import { SinglegameEngineProps } from "./types";
import { getGameServerUrl } from "../../end-point";

export class SinglegameEngine extends BaseEngine {
  constructor(props: SinglegameEngineProps) {
    super(props);
  }

  async fetchData(): Promise<FetchedData> {
    console.log("setup 시작");

    Paper.setup(this.canvasElement);

    console.log("게임 데이터 받아오는 중...");

    try {
      const response = await window.fetch(`${getGameServerUrl()}/singlegame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ src: this.src, level: this.gameLevel }),
      });

      const { data } = await response.json();

      console.log(`게임 데이터를 받아왔어요`);

      return data as { pieces: Piece[]; perColumn: number; perRow: number };
    } catch (error) {
      console.error("게임 데이터를 받아오는 중 오류가 발생했습니다.", error);
      throw error;
    }
  }
}
