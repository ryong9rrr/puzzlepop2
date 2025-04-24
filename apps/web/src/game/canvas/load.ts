import { IMG_ID } from "@puzzlepop2/game-core";
import { getGameStore } from "../store";
import { setup } from "./setup";

export const load = (props: { src: string; level: string }) => {
  const { src, level } = props;

  const imgElement = window.document.getElementById(IMG_ID) as HTMLImageElement;

  const { fetchPuzzleData } = getGameStore();

  return new Promise((resolve, reject) => {
    if (imgElement.complete) {
      fetchPuzzleData({ src, level })
        .then(() => {
          setup();
          resolve("Image already loaded, and puzzle data fetch success");
        })
        .catch(() => {
          reject("Image already loaded, but puzzle data fetch failed");
        });
      return;
    }

    imgElement.onload = () => {
      fetchPuzzleData({ src, level })
        .then(() => {
          setup();
          resolve("Image loaded, and puzzle data fetch success");
        })
        .catch(() => {
          reject("Image loaded, but puzzle data fetch failed");
        });
    };

    imgElement.onerror = error => {
      console.error("Error loading image", error);
      reject(error);
    };
  });
};
