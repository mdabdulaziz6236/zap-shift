import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { Link } from "react-router";
import { RiArrowRightUpLine } from "react-icons/ri";

const BannerButtons = () => (
  <div
    className="
      absolute 
      top-[60%] md:top-[70%] 
      left-6 md:left-12 
      flex items-center 
      gap-3 md:gap-6
    "
  >
    {/* Track Button + Arrow */}
    <div className="flex items-center gap-2">
      <Link
        to="/"
        className="
          py-2.5 px-5 
          md:py-4 md:px-8 
          bg-primary 
          font-bold 
          text-[#1F1F1F] 
          text-base md:text-xl 
          rounded-3xl
        "
      >
        Track Your Parcel
      </Link>

      <span
        className="
          p-2 md:p-3 
          rounded-full 
          text-primary 
          font-extrabold  
          bg-[#1F1F1F]
        "
      >
        <RiArrowRightUpLine size={20} />
      </span>
    </div>

    {/* Rider Button */}
    <button
      className="
        py-2.5 px-5 
        md:py-4 md:px-8 
        bg-white 
        font-semibold 
        text-base md:text-xl 
        rounded-3xl 
        shadow
      "
    >
      Be a Rider
    </button>
  </div>
);

const Banner = () => {
  return (
    <Carousel className="my-10" autoPlay={true} infiniteLoop={true}>
      
      {/* Slide 1 */}
      <div className="relative">
        <img src={bannerImg1} className="w-full h-auto" />
        <BannerButtons />
      </div>

      {/* Slide 2 */}
      <div className="relative">
        <img src={bannerImg2} className="w-full h-auto" />
        <BannerButtons />
      </div>

      {/* Slide 3 */}
      <div className="relative">
        <img src={bannerImg3} className="w-full h-auto" />
        <BannerButtons />
      </div>

    </Carousel>
  );
};

export default Banner;
