import Paper from "paper";
import { Piece } from "@puzzlepop2/game-core";
import { BaseEngine } from "../base/Base";
import { FetchedData } from "../base/types";
import { SinglegameEngineProps } from "./types";

export class SinglegameEngine extends BaseEngine {
  constructor(props: SinglegameEngineProps) {
    super(props);
  }

  async fetchData(): Promise<FetchedData> {
    console.log("setup 시작");

    Paper.setup(this.canvasElement);

    console.log("게임 데이터 받아오는 중...");
    const response = await window.fetch("http://localhost:8081/game-server/singlegame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ src: this.src, level: this.gameLevel }),
    });

    const { data } = await response.json();

    console.log(`게임 데이터를 받아왔어요`, this.fetchedData);

    return data as { pieces: Piece[]; perColumn: number; perRow: number };
  }
}
