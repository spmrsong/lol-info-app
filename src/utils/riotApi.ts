import { Champion } from "@/types/Champion";

export interface ChampionRotation {
  freeChampionIds: number[];
  freeChampionIdsForNewPlayers: number[];
  maxNewPlayerLevel: number;
}

export async function getChampionRotation(): Promise<ChampionRotation> {
  const res = await fetch("/api/rotation");

  if (!res.ok) {
    throw new Error("Failed to fetch champion rotation data");
  }

  return res.json();
}

export async function getChampionList(version: string): Promise<Champion[]> {
  const res = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch champion list");
  }

  const data = await res.json();
  return Object.values(data.data);
}
