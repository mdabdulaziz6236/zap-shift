import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;
  return (
    <div className="max-w-md mx-auto bg-base-100 p-8 my-24 rounded-3xl shadow-md ">
      {/* Quote Icon */}
      <div className="text-[#C3DFE2] text-4xl mb-4">
        <FaQuoteLeft />
      </div>

      {/* Message */}
      <p className="text-gray-600 font-bold leading-relaxed 
      ">{testimonial}</p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-6"></div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div >
          <img className="w-12 h-12 rounded-full bg-secondary" src={user_photoURL} alt="" />
        </div>

        <div>
          <h3 className="font-bold text-lg">{userName}</h3>
          <p className="text-sm text-gray-500"></p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
