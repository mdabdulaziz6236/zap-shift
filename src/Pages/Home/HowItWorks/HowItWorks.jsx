import React from "react";
import icon from "../../../assets/bookingIcon.png";

const HowItWorks = () => {
  return (
    <div>
      <h3 className="font-extrabold text-secondary text-3xl">How it Works</h3>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 pt-8 grid-cols-1 lg:grid-cols-4">
        <div className="p-8  rounded-2xl bg-gray-100">
          <img src={icon} alt="" />
          <h5 className="font-bold mt-6 text-xl text-secondary">
            Booking Pick & Drop
          </h5>
          <p className="font-medium pt-4">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="p-8  rounded-2xl bg-gray-100">
          <img src={icon} alt="" />
          <h5 className="font-bold mt-6 text-xl text-secondary">
            Cash On Delivery
          </h5>
          <p className="font-medium pt-4">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="p-8  rounded-2xl bg-gray-100">
          <img src={icon} alt="" />
          <h5 className="font-bold mt-6 text-xl text-secondary">
            Delivery Hub 
          </h5>
          <p className="font-medium pt-4">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
        <div className="p-8  rounded-2xl bg-gray-100">
          <img src={icon} alt="" />
          <h5 className="font-bold mt-6 text-xl text-secondary">
           Booking SME & Corporate
          </h5>
          <p className="font-medium pt-4">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
