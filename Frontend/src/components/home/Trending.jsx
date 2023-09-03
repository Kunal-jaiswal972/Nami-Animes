import React from "react";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

import { Card } from "@/components/ui/card";
import SlickCarousel from "@/components/slickCarousel/SlickCarousel";

import instance from "@/lib/axiosInstance";
import { hexToRgba } from "@/lib/hexToRgba";
import getBestTextColorForBackground from "@/lib/getBestContrastColor";
import { cn } from "@/lib/utils";

const Trending = () => {
  const fetchTrendingAnime = async () => {
    const response = await instance.get("/popular");
    return response.data;
  };

  const {
    data: trendingAnime,
    isLoading,
    isError,
  } = useQuery(["trendingAnime"], fetchTrendingAnime, {
    refetchOnWindowFocus: true,
    refetchOnReconnect: false,
    staleTime: 12 * 60 * 60 * 1000,
    cacheTime: 12 * 60 * 60 * 1000,
  });

  if (isError) return toast.error("Error Loading Trending Animes 😓!!");

  return (
    <>
      <div className="mb-2 self-start flex items-center justify-between  w-full">
        <h2 className="font-[Poppins] text-xl font-bold">Trending</h2>
        <span className="text-rose-400 text-base flex items-center justify-center opacity-75 transition-all duration-300 ease-in-out hover:opacity-100">
          <Link to="/trending">View More</Link>
        </span>
      </div>
      {isLoading ? (
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
      ) : (
        <SlickCarousel>
          {trendingAnime.data.map(({ coverImage, title, color, id }) => (
            <Card
              key={id}
              className={`w-[250px] h-[300px] flex items-center justify-center overflow-hidden relative group rounded-md`}
              title={title.english}
            >
              <img
                src={coverImage}
                alt={title.english}
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
                    "font-bold text-sm font-[Poppins] text-center",
                    getBestTextColorForBackground(color)
                      ? "text-black"
                      : "text-white"
                  )}
                >
                  {title.english}
                </div>
              </div>
            </Card>
          ))}
        </SlickCarousel>
      )}
    </>
  );
};

export default Trending;
