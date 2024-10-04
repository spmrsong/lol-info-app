import Image from "next/image";
import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute w-full h-full mx-0 overflow-hidden -z-10">
        <iframe
          className="absolute w-full h-full pointer-events-none"
          src="https://www.youtube.com/embed/tjOW-YVEzo4?autoplay=1&mute=1&loop=1&playlist=tjOW-YVEzo4&controls=0&modestbranding=1&cc_load_policy=0&showinfo=0"
          title="League of Legends Background Video"
          allow="autoplay; fullscreen; encrypted-media"
        ></iframe>
      </div>

      {/* Overlay Content */}
      <main className="relative z-10 py-40 text-center text-white">
        <h1 className="text-5xl text-[#d6b268]">LEAGUE OF LEGENDS</h1>
        <p className="text-gray-400 m-8">
          Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.
        </p>
        <ul className="text-[#d6b268]">
          <li className="m-10 inline-block">
            <Link href={"/champions"}>
              <div className="cursor-pointer">
                <Image
                  className="p-10"
                  src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/a6c8d002950906aadc8756c88e1596693f1ecdc4-1208x1208.png?auto=format&fit=fill&q=80&w=300"
                  alt="챔피언 목록"
                  width={300}
                  height={300}
                />
                <p>챔피언 목록</p>
              </div>
            </Link>
          </li>
          <li className="m-10 inline-block">
            <Link href={"/items"}>
              <div className="cursor-pointer">
                <Image
                  className="p-10"
                  src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/ea750002073d9972faebb836c63813d3567d7b60-1208x1208.png?auto=format&fit=fill&q=80&w=300"
                  alt="아이템 목록"
                  width={300}
                  height={300}
                />
                <p>아이템 목록</p>
              </div>
            </Link>
          </li>
          <li className="m-10 inline-block">
            <Link href={"/rotation"}>
              <div className="cursor-pointer">
                <Image
                  className="p-10"
                  src="https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/d6a6bbf21f174b692308326c7cfb099b4746fcd4-1208x1208.png?auto=format&fit=fill&q=80&w=300"
                  alt="금주 로테이션 챔피언"
                  width={300}
                  height={300}
                />
                <p>금주 로테이션 챔피언</p>
              </div>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
