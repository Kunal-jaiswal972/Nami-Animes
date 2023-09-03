import React, { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { BannerCarousel } from "@/components/slickCarousel/SlickCarousel";

import instance from "@/lib/axiosInstance";

const Carousel = () => {
  const [popularData, setPopularData] = useState(null);

  const fetchPopularAnime = async () => {
    try {
      const response = await instance.get("/popular");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // useEffect(() => {
  //   let isMounted = true;

  //   async function fetchData() {
  //     try {
  //       const data = await fetchPopularAnime();
  //       if (isMounted) {
  //         setPopularData(data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <>
      {popularData ? (
        <BannerCarousel>
          {popularData.data.slice(0, 10).map(({ bannerImage }, index) => (
            <div key={index} className="relative group w-full">
              <div className="absolute inset-0 hover:bg-slate-100 opacity-0 group-hover:opacity-50 z-50 transition-opacity duration-300" />
              <img
                src={bannerImage}
                alt={`Slide ${index + 1}`}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </BannerCarousel>
      ) : (
        <div className="flex items-center justify-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-[70vh] w-[90vw] rounded-lg animate-pulse" />
            <Skeleton className="h-10 w-[80vw] rounded-lg animate-pulse" />
          </div>
        </div>
      )}
    </>
  );
};

export default Carousel;
