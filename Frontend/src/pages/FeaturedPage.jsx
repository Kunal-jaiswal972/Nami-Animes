import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { Grid, InfinitySpin } from "react-loader-spinner";

import Layout from "@/layouts/Layout";
import Cards from "@/components/cards/Cards";

import { DEFAULT_PAGE, MAX_PER_PAGE } from "@/constants/constants";

import instance from "@/lib/axiosInstance";

const FeaturedPage = ({ endpoint, title, queryKey }) => {
  const fetchAnimeData = async ({ pageParam = DEFAULT_PAGE }) => {
    const { data } = await instance.get(
      `/${endpoint}?page=${pageParam}&perPage=${MAX_PER_PAGE}`
    );
    return data;
  };

  const getNextParam = (prevData) => {
    if (prevData.pagination.hasOwnProperty("hasNextPage"))
      return prevData.pagination["hasNextPage"]
        ? prevData.pagination.currentPage + 1
        : null;
  };

  const {
    data,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isInitialLoading,
  } = useInfiniteQuery({
    queryKey: [queryKey, "infinite"],
    queryFn: fetchAnimeData,
    getNextPageParam: getNextParam,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    keepPreviousData: true,
  });

  const animeData = data?.pages.flatMap((page) => page.data);

  return (
    <Layout>
      <Helmet>
        <title>{title} | Nami-animes</title>
      </Helmet>
      <section className="container mt-20">
        <header className="mb-4">
          <h1 className="uppercase font-bold text-xl font-[Poppins]">
            {title}
          </h1>
        </header>

        {/* replace with react-virtualized or react-infinte-scroller */}

        {!isInitialLoading ? (
          <InfiniteScroll
            dataLength={animeData ? animeData.length : 0}
            hasMore={hasNextPage}
            next={() => {
              if (!isFetchingNextPage) fetchNextPage();
            }}
            key={animeData.length || 0}
            loader={
              <div className="w-full h-full flex flex-col items-center justify-center mb-10">
                <InfinitySpin width="200" color="rgb(244 63 94)" />
                <div className="text-sm font-bold text-zinc-300">
                  Please wait while we are loading!!
                </div>
              </div>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {animeData?.map((anime) => (
                <Cards anime={anime} key={anime.anilistId || anime.malId} />
              ))}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="w-full h-[50vh] flex items-center justify-center">
            <Grid
              height="80"
              width="80"
              color="rgb(244 63 94)"
              ariaLabel="grid-loading"
              radius="12.5"
              visible={true}
            />
          </div>
        )}
        {isError && toast.error(`Error Loading ${title} Animes 😓!!`)}
      </section>
    </Layout>
  );
};

export default FeaturedPage;
