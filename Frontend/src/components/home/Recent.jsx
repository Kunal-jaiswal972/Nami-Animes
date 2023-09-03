import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import { useQuery } from "@tanstack/react-query";

import SlickCarousel from "@/components/slickCarousel/slickCarousel";
import { Card } from "@/components/ui/card";

import { hexToRgba } from "@/lib/hexToRgba";
import instance from "@/lib/axiosInstance";
import { cn } from "@/lib/utils";
import getBestTextColorForBackground from "@/lib/getBestContrastColor";

const Recent = () => {
  const fetchRecentAnime = async () => {
    const response = await instance.get("/recent");
    return response.data;
  };

  const {
    data: recentAnime,
    isLoading,
    isError,
  } = useQuery(["recentAnime"], fetchRecentAnime, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 12 * 60 * 60 * 1000,
    cacheTime: 12 * 60 * 60 * 1000,
  });

  if (isError) return toast.error("Error Loading Trending Animes 😓!!");

  return (
    <>
      <header className="mb-2 self-start flex items-center justify-between  w-full">
        <h2 className="font-[Poppins] text-xl font-bold">Recent</h2>
        <span className="text-rose-400 text-base flex items-center justify-center opacity-75 transition-all duration-300 ease-in-out hover:opacity-100">
          <Link to="/trending">View More</Link>
        </span>
      </header>
      {!isLoading ? (
        <SlickCarousel>
          {recentAnime.data.map(
            ({ anime: { coverImage, title, id, color } }) => (
              <Card
                key={id}
                className={`w-[250px] h-[300px] flex items-center justify-center overflow-hidden relative group rounded-md`}
                title={title.english || title.userPreferred}
              >
                <img
                  src={coverImage}
                  alt={title.english || title.userPreferred}
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
                    {title.english || title.userPreferred}
                  </div>
                </div>
              </Card>
            )
          )}
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
    </>
  );
};

export default Recent;
