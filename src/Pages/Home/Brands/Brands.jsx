import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonStar from "../../../assets/brands/moonStar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import { Autoplay } from "swiper/modules";

const brandLogos = [
  amazon,
  amazon_vector,
  casio,
  moonStar,
  randstad,
  star,
  start_people,
];
const Brands = () => {
  return (
    <>
      <h3 className="mb-12 text-secondary text-center font-extrabold text-3xl   ">
        We've helped thousands of sales teams
      </h3>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img src={logo} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Brands;
