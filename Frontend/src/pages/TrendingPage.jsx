import React, { useCallback, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { toast } from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

import Layout from "@/layouts/Layout";

import instance from "@/lib/axiosInstance";

const TrendingPage = () => {
  const fetchTrendingAnime = async ({ pageParam = 1 }) => {
    const perPage = 30;
    const response = await instance.get(
      `/popular?page=${pageParam}&perPage=${perPage}`
    );
    return response.data;
  };

  const { data, isError, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["trendingInfinte"],
      queryFn: fetchTrendingAnime,
      getNextPageParam: (prevData) => prevData.meta.next,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    });

  if (isError) return toast.error("Error Loading Trending Animes 😓!!");

  const a = data?.pages.flatMap((page) => page.data);

  return (
    <Layout>
      <Helmet>
        <title>Trending | Nami-animes</title>
      </Helmet>
      <section className="container mt-20 h-screen overflow-scroll">
        <header className="mb-8">
          <h1 className="uppercase font-bold text-xl font-[Poppins]">
            trending
          </h1>
        </header>

        <InfiniteScroll
          dataLength={a ? a.length : 0}
          hasMore={hasNextPage}
          next={() => fetchNextPage()}
          loader={<div>loading</div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          inverse={true}
        >
          {a &&
            a.map((anime) => (
              <div
                className="h-100px overflow-hidden border-2 border-rose-700"
                key={anime.slug}
              >
                {anime.slug}
              </div>
            ))}
        </InfiniteScroll>
      </section>
    </Layout>
  );
};

export default TrendingPage;
