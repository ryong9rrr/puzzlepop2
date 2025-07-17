import fs from "fs";
import sharp from "sharp";
import { SINGLE_GAME_PUZZLE_IMAGE_SIZE_MAP } from "@puzzlepop2/game-core";

const createRootDir = (destination = "out") => {
  // 이미 있으면 pass
  if (fs.existsSync(destination)) {
    return;
  }
  fs.mkdirSync(destination, { recursive: true });
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
    Object.entries(SINGLE_GAME_PUZZLE_IMAGE_SIZE_MAP).map(([gameMode, size]) => {
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

// 이미지를 비율에 맞게 최소 1000px로 리사이징
export const resizeUpImage = async props => {
  const { source, destination = "out" } = props;

  createRootDir(destination);

  const [filename] = source.split(".");

  const image = sharp(source);
  const metadata = await image.metadata();

  const width = metadata.width;
  const height = metadata.height;

  if (!width || !height) {
    throw new Error("이미지의 가로 세로 길이를 가져오는데 실패했습니다.");
  }

  // 짧은 쪽이 1000이 되게 비율 계산
  const scale = 1000 / Math.min(width, height);

  const newWidth = Math.round(width * scale);
  const newHeight = Math.round(height * scale);

  // 리사이징하면서 webp로 변환
  sharp(source)
    .resize(newWidth, newHeight)
    .toFormat("webp")
    .toFile(`${destination}/${filename}/up.webp`);
};

//createImages({ source: "whats-your-name.webp" });

//resizeUpImage({ source: "totoro.jpg" });
