import { NextRequest, NextResponse } from "next/server";
import { practicePuzzles } from "./data";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const { type } = data;

  if (!type) {
    return new Response(null, {
      status: 400,
    });
  }

  if (type === "GET_PUZZLE_LIST") {
    return NextResponse.json({ data: practicePuzzles });
  }

  if (type === "GET_PUZZLE_BY_ID" && data.id) {
    const puzzle = practicePuzzles.find(p => p.id === data.id);
    if (!puzzle) {
      return new Response(null, {
        status: 400,
      });
    }

    return NextResponse.json({ data: puzzle });
  }

  return new Response(null, {
    status: 400,
  });
}
