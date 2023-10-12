import React from "react";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import SlickCarousel from "@/components/slickCarousel/SlickCarousel";
import { Card } from "@/components/ui/card";

import getBestTextColorForBackground from "@/lib/getBestContrastColor";
import instance from "@/lib/axiosInstance";
import { hexToRgba } from "@/lib/hexToRgba";
import { cn } from "@/lib/utils";

import { DEFAULT_PAGE, MAX_PER_PAGE } from "@/constants/constants";

const Featured = ({ endpoint, title, queryKey }) => {
  const fetchAnimeData = async () => {
    const { data } = await instance.get(
      `/${endpoint}?page=${DEFAULT_PAGE}&perPage=${MAX_PER_PAGE}`
    );
    return data;
  };

  const {
    data: animeData,
    isLoading,
    isError,
  } = useQuery([queryKey], fetchAnimeData, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      <header className="mb-2 self-start flex items-center justify-between  w-full">
        <h2 className="font-[Poppins] text-xl font-bold">{title}</h2>
        <span className="text-rose-400 text-base flex items-center justify-center opacity-75 transition-all duration-300 ease-in-out hover:opacity-100">
          <Link to={`/${title.replace(/\s/g, "")}`}>View More</Link>
        </span>
      </header>
      {!isLoading ? (
        <SlickCarousel>
          {animeData &&
            animeData.data.map((anime) => {
              const { anilistId, malId, image, titles, color } = anime;
              return (
                <Card
                  key={anilistId || malId}
                  className={`w-[250px] h-[300px] overflow-hidden relative group rounded-md`}
                  title={titles.english || titles.default || titles.japanese}
                >
                  <img
                    src={image}
                    alt={titles.english || titles.default || titles.japanese}
                    className="w-full h-full object-cover cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-2 hover:z-40"
                  />
                  <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 p-2 pb-5 flex items-end justify-center"
                    style={{
                      background: `linear-gradient(to bottom, ${hexToRgba(
                        color,
                        0.01
                      )}, ${hexToRgba(color, 0.6)})`,
                    }}
                  >
                    <div
                      className={cn(
                        "font-bold text-sm font-[Poppins] text-center line-clamp-2",
                        getBestTextColorForBackground(color)
                          ? "text-black"
                          : "text-white"
                      )}
                    >
                      {titles.english || titles.default || titles.japanese}
                    </div>
                  </div>
                </Card>
              );
            })}
        </SlickCarousel>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Rings
            height="80"
            width="80"
            color="rgb(244 63 94)"
            radius="6"
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      )}

      {isError && toast.error(`Error Loading ${title} Animes 😓!!`)}
    </>
  );
};

export default Featured;
