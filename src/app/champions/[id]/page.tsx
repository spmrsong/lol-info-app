import React from "react";
import { fetchLatestVersion, fetchChampionDetail } from "@/utils/serverApi";
import Image from "next/image";
import { Metadata } from "next";

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const version = await fetchLatestVersion();
  const championDetail = await fetchChampionDetail(params.id, version);

  return {
    title: `${championDetail.name} - ${championDetail.title}`,
    description: championDetail.lore,
  };
}

// 챔피언 상세 페이지
const ChampionDetailPage = async ({ params }: Params) => {
  try {
    const version = await fetchLatestVersion();
    const championDetail = await fetchChampionDetail(params.id, version);

    return (
      <main className="py-32">
        <div className="flex flex-col items-center">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championDetail.id}_0.jpg`}
            alt={championDetail.name}
            width={500}
            height={280}
            className="rounded-lg mb-6"
            priority
            sizes="(max-width: 768px) 100vw, 500px"
          />
          <h1 className="text-3xl font-bold mb-4">
            {championDetail.name} - {championDetail.title}
          </h1>
          <p className="text-lg text-gray-700 text-center max-w-4xl mb-6">
            {championDetail.lore}
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">스킬</h2>
          <div className="grid grid-cols-4 gap-4 max-w-4xl">
            {championDetail.spells.map((spell) => (
              <div
                key={spell.id}
                className="flex flex-col items-center p-4 border-2 rounded-lg shadow-md"
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                  alt={spell.name}
                  width={64}
                  height={64}
                  className="mb-2"
                />
                <h3 className="text-lg font-semibold text-center">
                  {spell.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {spell.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="p-8">
        <div>Error: {(error as Error).message}</div>
      </main>
    );
  }
};

export default ChampionDetailPage;
