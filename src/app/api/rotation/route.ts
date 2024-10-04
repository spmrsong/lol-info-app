import { NextRequest, NextResponse } from "next/server";
import { ChampionRotation } from "@/types/ChampionRotation";

export async function GET(request: NextRequest) {
  // NextRequest는 요청, 서버측 메서드 / NextResponse는 응답
  const apiKey = process.env.RIOT_API_KEY; // 환경변수에서 api키 가져오기

  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    const res = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch champion rotations" },
        { status: res.status }
      );
    }

    const data: ChampionRotation = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while fetching the data" },
      { status: 500 }
    );
  }
}
