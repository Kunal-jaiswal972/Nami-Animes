import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import Carousel from "@/components/home/Carousel";
import Featured from "@/components/home/Featured";

import Layout from "@/layouts/Layout";

const Home = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (!userId) {
    navigate("/sign-in");
    return;
  }
  
  return (
    <Layout>
      <section className="w-full h-[96vh] px-14 flex items-center justify-center">
        <Carousel />
      </section>
      {/* <section className="w-full h-[50vh] flex flex-col items-center justify-center mb-24 px-14">
        <Featured
          endpoint="getCurrentlyAiringAnimes"
          title="Currently Airing"
          queryKey="currentlyAiringAnimes"
        />
      </section> */}
      <section className="w-full h-[50vh] flex flex-col items-center justify-center mb-24 px-14">
        <Featured
          endpoint="getTrendingAnimes"
          title="Trending"
          queryKey="trendingAnimes"
        />
      </section>
      <section className="w-full h-[50vh] flex flex-col items-center justify-center mb-24 px-14">
        <Featured
          endpoint="getTopAnimes"
          title="Popular"
          queryKey="topAnimes"
        />
      </section>
    </Layout>
  );
};

export default Home;
