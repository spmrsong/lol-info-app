import React from "react";
import { fetchLatestVersion, fetchChampionList } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

const ChampionPage = async () => {
  try {
    const version = await fetchLatestVersion();
    const champions = await fetchChampionList(version);

    return (
      <main className="py-32">
        <h1 className="text-2xl font-bold mb-6">챔피언 목록</h1>
        <div className="grid grid-cols-5 gap-6">
          {champions.map(({ id, name, title }) => (
            <Link key={id} href={`/champions/${id}`}>
              <div className="text-center border-2 rounded-lg p-4 shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${id}.png`}
                  alt={name}
                  width={120}
                  height={120}
                  className="mx-auto mb-4"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm text-gray-500">{title}</p>
              </div>
            </Link>
          ))}
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

export default ChampionPage;
