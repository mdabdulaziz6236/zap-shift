import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import AuthImage from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="bg-[#FAFDF0] flex max-w-7xl min-h-screen mx-auto py-11 justify-center">
      <div className="flex-1 flex flex-col">
        <Logo></Logo>
        <Outlet></Outlet>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <img src={AuthImage} alt="" />
      </div>
    </div>
  );
};

export default AuthLayout;
