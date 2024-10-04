import { Item } from "@/types/Item";
import { fetchLatestVersion, fetchItemList } from "@/utils/serverApi";
import React from "react";

export const revalidate = 86400;

const ItemPage = async () => {
  try {
    const version = await fetchLatestVersion();
    const items: Item[] = await fetchItemList(version);

    const uniqueItems = Array.from(
      new Map(items.map((item) => [item.name, item])).values()
    );

    return (
      <main className="py-32">
        <h1 className="text-2xl font-bold mb-6">아이템 목록</h1>
        <div className="grid grid-cols-6 gap-6">
          {uniqueItems.map((item: Item) => (
            <div key={item.id} className="border-2 rounded-lg p-4 shadow-md">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${item.image.full}`}
                alt={item.name}
                className="w-16 h-16 mb-4 mx-auto"
              />
              <h2 className="text-lg font-semibold text-center">{item.name}</h2>
              <p className="text-sm text-gray-500 text-center">
                {extractKorean(item.plaintext) || ""}
              </p>
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main>
        <div>Error: {(error as Error).message}</div>
      </main>
    );
  }
};

// 한글만 추출하는 함수
function extractKorean(text: string | undefined): string {
  if (!text) return "";
  return text.replace(/[^가-힣\s]/g, "").trim();
}

export default ItemPage;
