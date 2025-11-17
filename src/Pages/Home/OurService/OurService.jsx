import React from "react";
import service from "../../../assets/service.png";
const OurService = () => {
  return (
    <div className="bg-secondary p-20 rounded-2xl my-20 ">
      <h3 className="text-center text-white text-4xl font-extrabold">
        Our Service
      </h3>
      <p className="text-center text-[#DADADA] pt-4 pb-8 ">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to <br /> business shipments — we deliver
        on time, every time.
      </p>

      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <div className="py-8 hover:bg-primary flex flex-col justify-center items-center bg-gray-100  rounded-2xl px-6">
          <img src={service} alt="" />
          <h1 className="font-bold text-secondary text-2xl py-4">
            Express & Standard Delivery
          </h1>
          <p className="text-center font-medium">
            We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="py-8 hover:bg-primary flex flex-col justify-center items-center bg-gray-100  rounded-2xl px-6">
          <img src={service} alt="" />
          <h1 className="font-bold text-secondary text-2xl py-4">
            Nationwide Delivery
          </h1>
          <p className="text-center font-medium">
            We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="py-8 hover:bg-primary flex flex-col justify-center items-center bg-gray-100  rounded-2xl px-6">
          <img src={service} alt="" />
          <h1 className="font-bold text-secondary text-2xl py-4">
            Fulfillment Solution
          </h1>
          <p className="text-center font-medium">
            We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="py-8 hover:bg-primary flex flex-col justify-center items-center bg-gray-100  rounded-2xl px-6">
          <img src={service} alt="" />
          <h1 className="font-bold text-secondary text-2xl py-4">
            Cash on Home Delivery
          </h1>
          <p className="text-center font-medium">
            We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="py-8 hover:bg-primary flex flex-col justify-center items-center bg-gray-100  rounded-2xl px-6">
          <img src={service} alt="" />
          <h1 className="font-bold text-secondary text-2xl py-4">
            Corporate Service / Contract In Logistics
          </h1>
          <p className="text-center font-medium">
            We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6
            hours from pick-up to drop-off.
          </p>
        </div>
        <div className="py-8 hover:bg-primary flex flex-col justify-center items-center bg-gray-100  rounded-2xl px-6">
          <img src={service} alt="" />
          <h1 className="font-bold text-secondary text-2xl py-4">
            Parcel Return
          </h1>
          <p className="text-center font-medium">
            We deliver parcels within 24-72 hours in Dhaka, Chittagong, Sylhet,
            Khulna, and Rajshahi. Express delivery available in Dhaka within 4-6
            hours from pick-up to drop-off.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurService;
