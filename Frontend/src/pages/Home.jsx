import Carousel from "@/components/home/Carousel";
import Recent from "@/components/home/Recent";
import Trending from "@/components/home/Trending";
import Layout from "@/layouts/Layout";
import React from "react";

const Home = () => {
  return (
    <Layout>
      <section className="w-full h-[96vh] px-14 flex items-center justify-center">
        <Carousel />
      </section>
      <section className="w-full h-[50vh] flex flex-col items-center justify-center mb-24 px-14">
        <Trending />
      </section>
      <section className="w-full h-[50vh] flex flex-col items-center justify-center mb-24 px-14">
        <Recent />
      </section>
    </Layout>
  );
};

export default Home;
