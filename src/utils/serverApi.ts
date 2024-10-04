import { Champion, ChampionDetail } from "@/types/Champion";
import { Item } from "@/types/Item";

// 최신 버전 정보 가져오기
export async function fetchLatestVersion(): Promise<string> {
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch versions");
    }

    const versions: string[] = await res.json();
    return versions[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching latest version: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching the latest version"
      );
    }
  }
}

// 챔피언 목록 가져오기
export async function fetchChampionList(version: string): Promise<Champion[]> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch champion list");
    }

    const data = await response.json();
    return Object.values(data.data); // 챔피언 데이터를 배열 형태로 변환 후 반환
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching champion list: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching the champion list"
      );
    }
  }
}

// 챔피언 상세 정보 가져오기
export async function fetchChampionDetail(
  championId: string,
  version: string
): Promise<ChampionDetail> {
  try {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${championId}.json`,
      {
        cache: "no-store", // 최신 데이터를 가져오기 위해 캐시 사용 안 함
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch champion details for ${championId}`);
    }

    const data = await response.json();
    return data.data[championId];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching champion details: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching the champion details"
      );
    }
  }
}

// 아이템 목록 가져오기
export async function fetchItemList(version: string): Promise<Item[]> {
  try {
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch item data");
    }

    const data = await res.json();
    return Object.values(data.data); // 아이템 데이터 추출
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching item list: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching the item list");
    }
  }
}
