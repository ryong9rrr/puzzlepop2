import { NextRequest, NextResponse } from "next/server";
import * as PostType from "./post-types";

export async function GET() {
  return NextResponse.json({
    message: "Hello, World!",
  });
}

export async function POST(request: NextRequest) {
  const { type } = await request.json();

  switch (type) {
    case PostType.GET_SINGLE_GAME_PUZZLE_LIST: {
      const data = await MOCK_getSingleGamePuzzleList();
      return NextResponse.json(data);
    }
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

const images = [
  { src: "/map-samples/map-sample1.jpg" },
  { src: "/map-samples/map-sample2.jpg" },
  { src: "/map-samples/map-sample3.jpeg" },
  { src: "/map-samples/map-sample4.jpg" },
  { src: "/map-samples/map-sample5.avif" },
  { src: "/map-samples/map-sample6.jpg" },
];

const MOCK_getSingleGamePuzzleList = async () => {
  const _images = images.map((image, index) => {
    return {
      id: index,
      src: image.src,
      title: `제목${index}`,
      description: `설명${index}`,
    };
  });

  // 의도적 지연
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        images: _images,
      });
    }, 2000);
  });
};
