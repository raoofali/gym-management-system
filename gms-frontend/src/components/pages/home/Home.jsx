import React from "react";
import Login from "./Login";
import SingUp from "./SingUp";

const Home = () => {
  return (
    <div className="bg-red w-full">
      {/* Header */}
      <div className="border-2 border-slate-800 bg-slate-800 flex text-white p-3 font-semibold text-xl w-full justify-center text-center">
        Welcome to Gym Management System
      </div>

      {/* Background and layout */}
      <div
        className="w-full min-h-screen flex justify-center items-center bg-cover bg-center px-4"
        style={{
          backgroundImage: `url("https://getwallpapers.com/wallpaper/full/3/1/b/200524.jpg")`,
        }}
      >
        {/* Responsive Flex: stacked on mobile, side-by-side on large screens */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[200px]">
          <Login />
          <SingUp />
        </div>
      </div>
    </div>
  );
};

export default Home;
