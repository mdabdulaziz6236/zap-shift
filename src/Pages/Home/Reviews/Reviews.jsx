import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import customer_top from "../../../assets/customer-top.png";
import ReviewCard from "./ReviewCard";

const Reviews = ({ ReviewsPromise }) => {
  const reviews = use(ReviewsPromise);
  // console.log(reviews);
  return (
    <div className="mt-25">
        <hr className="border-t mb-10 border-2 border-secondary border-dashed" />

      <div>
        <div className="flex justify-center items-center">
          <img src={customer_top} alt="" />
        </div>
        <h3 className="my-10 font-extrabold text-4xl text-secondary text-center">
          What our customers are sayings
        </h3>
        <p className="text-center font-bold ">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
        <div className="my-10">
          <Swiper
            loop={true}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={2}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 30,
              stretch: "50%",
              depth: 200,
              modifier: 1,
              scale: 0.75,
              slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="mySwiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review}></ReviewCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
              <hr className="border-t mt-10 border-2 border-secondary border-dashed" />
    </div>
  );
};

export default Reviews;
