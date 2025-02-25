import fs from "fs";
import sharp from "sharp";
import { PUZZLE_IMAGE_SIZE_MAP } from "@puzzlepop2/game-core";

const createRootDir = () => {
  fs.mkdirSync("out", { recursive: true });
};

const createFileDir = props => {
  const { source, destination } = props;

  const [filename] = source.split(".");
  fs.mkdirSync(`${destination}/${filename}`, { recursive: true });
};

export const createImages = props => {
  const { source, destination = "out" } = props;

  createRootDir();
  createFileDir({ source, destination });

  const [filename, ext] = source.split(".");

  // 원본 복사
  fs.copyFileSync(source, `${destination}/${filename}/origin.${ext}`);

  // 원본이 webp가 아니면 webp로 변환
  if (ext !== "webp") {
    sharp(source)
      .toFormat("webp")
      .toFile(`${destination}/${filename}/origin.webp`)
      .catch(() => {
        console.error("원본을 wepb로 변환하는데 실패했습니다.");
        process.exit(1);
      });
  }

  // 리사이징하면서 webp로 변환
  Promise.all(
    Object.entries(PUZZLE_IMAGE_SIZE_MAP).map(([gameMode, size]) => {
      const { width, height } = size;
      sharp(source)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .resize(width, height, { fit: "cover", position: "center" })
        .toFormat("webp")
        .toFile(`${destination}/${filename}/${gameMode}.webp`);
    }),
  ).catch(() => {
    console.error("이미지를 줄이는데 실패했습니다.");
    process.exit(1);
  });
};

//createImages({ source: "whats-your-name.webp" });
