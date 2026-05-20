import React, { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";

const DashBoard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        accordianDashboard &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setAccordianDashboard(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [accordianDashboard]);

  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  const cards = [
    {
      icon: <PeopleIcon sx={{ fontSize: 50, color: "#3b82f6" }} />,
      label: "Joined Members",
      link: "/Member",
    },
    {
      icon: <SignalCellularAltIcon sx={{ fontSize: 50, color: "#9333ea" }} />,
      label: "Monthly Joined",
      link: "/specific/monthly",
      onClick: () => handleOnClickMenu("Monthly Joined"),
    },
    {
      icon: <AccessAlarmsIcon sx={{ fontSize: 50, color: "#ef4444" }} />,
      label: "Expiring Within 3 Days",
      link: "/specific/Expiring Within 3 Days",
      onClick: () => handleOnClickMenu("Expiring Within 3 Days"),
    },
    {
      icon: <WarningAmberIcon sx={{ fontSize: 50, color: "#f59e0b" }} />,
      label: "Expiring in 4-7 Days",
      link: "/specific/Expiring in 4-7 Days",
      onClick: () => handleOnClickMenu("Expiring in 4-7 Days"),
    },
    {
      icon: <ReportGmailerrorredIcon sx={{ fontSize: 50, color: "#dc2626" }} />,
      label: "Expired",
      link: "/specific/Expired",
      onClick: () => handleOnClickMenu("Expired"),
    },
    {
      icon: <MilitaryTechIcon sx={{ fontSize: 50, color: "#6b7280" }} />,
      label: "Inactive Members",
      link: "/specific/Inactive Members",
      onClick: () => handleOnClickMenu("Inactive Members"),
    },
  ];

  return (
    <div
      className="w-3/4   relative bg-white text-white p-8
    
         h-[100vh]   bg-cover bg-center"
      style={{
        backgroundImage: `url("https://getwallpapers.com/wallpaper/full/3/1/b/200524.jpg")`,
      }}
    >
      {/* Header */}
      <div className="w-full bg-slate-900/50 rounded-lg flex p-3 text-white justify-between items-center shadow-md">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setAccordianDashboard((prev) => !prev)}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="User"
          className="w-8 h-8 rounded-full border-2 border-white"
        />
      </div>

      {/* Accordion Message */}
      {accordianDashboard && (
        <div
          ref={ref}
          className="absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight"
        >
          <div>Hi Welcome to our Gym Management System.</div>
          <p>Feel free to ask any queries</p>
        </div>
      )}

      {/* Card Grid */}
      <div className="mt-5 pt-3  grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-5">
        {cards.map((card, idx) => (
          <div key={idx} onClick={card.onClick}>
            <Link to={card.link}>
              <div className="w-full h-fit border text-white  rounded-xl shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-slate-900 hover:text-white">
                <div className="h-2 rounded-t-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/10"></div>
                <div className="py-8 px-5 flex flex-col justify-center items-center text-center rounded-b-lg">
                  {card.icon}
                  <p className="text-lg mt-4 font-semibold font-mono">
                    {card.label}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 w-full bg-slate-900/50 text-white mt-10 rounded-xl text-center text-base">
        Contact Developer for any Technical Error at{" "}
        <a href="tel:+923074958499" className="underline">
          +923074958499
        </a>
      </div>

      <div className="flex justify-between mt-10 pr-4">
        <div className="flex gap-7 cursor-pointer">
          <div className="w-1/4 sm:w-1/2 lg:w-1/5 bg-gray-800 rounded-2xl shadow-lg p-4 h-[160px] transition-transform duration-300 hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
              className="w-12 mx-auto mb-2"
              alt="Trainer"
            />
            <h3 className="text-lg font-semibold mb-1 text-center">
              Certified Trainers
            </h3>
            <p className="text-gray-400 text-xs text-center">
              Top-level trainers to guide you at every step.
            </p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/5 bg-gray-800 rounded-2xl shadow-lg p-4 h-[160px] transition-transform duration-300 hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
              className="w-12 mx-auto mb-2"
              alt="Plans"
            />
            <h3 className="text-lg font-semibold mb-1 text-center">
              Custom Plans
            </h3>
            <p className="text-gray-400 text-xs text-center">
              Personalized diet & workout plans for every goal.
            </p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/5 bg-gray-800 rounded-2xl shadow-lg p-4 h-[160px] transition-transform duration-300 hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3082/3082022.png"
              className="w-12 mx-auto mb-2"
              alt="Live"
            />
            <h3 className="text-lg font-semibold mb-1 text-center">
              Live Classes
            </h3>
            <p className="text-gray-400 text-xs text-center">
              Workout live with trainers & community support.
            </p>
          </div>

          <div className="w-full sm:w-1/2 lg:w-1/5 bg-gray-800 rounded-2xl shadow-lg p-4 h-[160px] transition-transform duration-300 hover:scale-105">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
              className="w-12 mx-auto mb-2"
              alt="Tracker"
            />
            <h3 className="text-lg font-semibold mb-1 text-center">
              Progress Tracking
            </h3>
            <p className="text-gray-400 text-xs text-center">
              Track your progress with weekly insights.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <FacebookIcon
            className="text-blue-600 hover:text-blue-800= transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            sx={{ fontSize: 40 }}
          />
          <InstagramIcon
            className="text-pink-500 hover:text-pink-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            sx={{ fontSize: 40 }}
          />
          <GoogleIcon
            className="text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            sx={{ fontSize: 40 }} 
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
