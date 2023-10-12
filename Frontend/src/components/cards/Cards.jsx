import React from "react";
import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { hexToRgba } from "@/lib/hexToRgba";

const Cards = ({ anime }) => {
  const {
    anilistId,
    malId,
    image,
    titles,
    currentEpisodes,
    totalEpisodes,
    duration,
    format,
    color,
  } = anime;
  return (
    <Card className="overflow-hidden rounded-md cursor-pointer relative group font-[Poppins]">
      <Link to={`/anime/${anilistId}`}>
        <div className="w-full absolute z-20 top-2 flex justify-between px-1">
          <Badge className="font-bold" variant="primary">
            {format}
          </Badge>
        </div>
        <img
          src={image}
          alt={titles.english || titles.default || titles.japanese}
          className="w-full h-full object-cover cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110 hover:translate-y-2 hover:z-40"
        />
        <div className="w-full absolute z-20 bottom-2 flex justify-between px-1">
          <Badge className="font-bold" variant="primary">
            {currentEpisodes && totalEpisodes
              ? `${currentEpisodes}/${totalEpisodes} `
              : currentEpisodes || totalEpisodes}{" "}
            EPS
          </Badge>
          <Badge className="font-bold" variant="primary">
            {duration}
          </Badge>
        </div>

        <div
          className="absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 p-2 pb-5 flex items-end justify-center"
          style={{
            background: `linear-gradient(to bottom, ${hexToRgba(
              color,
              0.01
            )}, ${hexToRgba(color, 0.6)})`,
          }}
        />
      </Link>
    </Card>
  );
};

export default Cards;
