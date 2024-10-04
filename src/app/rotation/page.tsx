"use client";

import React, { useEffect, useState } from "react";
import { getChampionRotation, getChampionList } from "@/utils/riotApi";
import Image from "next/image";
import Link from "next/link";
import { fetchLatestVersion } from "@/utils/serverApi";
import { Champion } from "@/types/Champion";

const RotationPage = () => {
  const [rotationData, setRotationData] = useState<number[]>([]);
  const [championList, setChampionList] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const version = await fetchLatestVersion();

        const rotation = await getChampionRotation();
        setRotationData(rotation.freeChampionIds);

        const champions = await getChampionList(version);
        setChampionList(champions);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // 로테이션 데이터와 챔피언 전체 데이터를 매핑하여 렌더링 준비
  const championsInRotation = championList.filter(({ key }) =>
    rotationData.includes(parseInt(key))
  );

  return (
    <main className="py-32">
      <h1 className="text-2xl font-bold mb-6">로테이션 챔피언</h1>
      <div className="grid grid-cols-5 gap-6">
        {championsInRotation.map(({ id, name, title }) => (
          <Link key={id} href={`/champions/${id}`}>
            <div
              key={id}
              className="border-2 rounded-lg p-4 shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${id}.png`}
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
};

export default RotationPage;
