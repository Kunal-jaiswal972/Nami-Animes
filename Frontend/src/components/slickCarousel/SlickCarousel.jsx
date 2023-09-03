import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const defaultSettings = {
  infinite: true,
  speed: 500,
  // autoplay: true,
  autoplaySpeed: 5000,
  swipeToSlide: true,
};

const settings = {
  ...defaultSettings,
  slidesToShow: 6,
  slidesToScroll: 6,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const bannerSettings = {
  ...defaultSettings,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const SlickCarousel = ({ isBanner, children }) => {
  return (
    <Slider {...settings} className="w-full">
      {children}
    </Slider>
  );
};

export const BannerCarousel = ({ children }) => {
  return (
    <Slider {...bannerSettings} className="w-full">
      {children}
    </Slider>
  );
};

export default SlickCarousel;
