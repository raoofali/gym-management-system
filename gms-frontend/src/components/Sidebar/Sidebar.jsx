import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [greeting, setGreeting] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting('Good Morning ☀️');
    } else if (currentHour < 18) {
      setGreeting('Good Afternoon 🌞');
    } else if (currentHour < 21) {
      setGreeting('Good Evening 🌇');
    } else {
      setGreeting('Good Night 🌙');
    }
  }, []);

  const handleLogout = async () => {
    sessionStorage.clear();
    navigate('/');
  };

  const handleGetStarted = () => {
    navigate('/start-now');
  };

  const baseClass = `flex gap-5 font-semibold text-xl p-2 rounded-xl cursor-pointer 
    bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 
    hover:from-purple-600 hover:via-pink-500 hover:to-yellow-400 
    text-white transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:text-black`;

  const activeClass = `border-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`;

  return (
    <div className="w-1/4 h-[100vh] border-2 bg-slate-800 font-extralight text-white p-5 ">
      <div className="text-center text-3xl">Power Zone</div>

      <div className="flex gap-5 my-5">
        <div className="w-[100px] h-[100px] rounded-l-lg">
          <img
            alt="gym pic"
            className="w-full h-full rounded-full"
            src="https://th.bing.com/th/id/OIP.WIH_3B9CFjdGMH_8KDstPwHaE8?r=0&w=650&h=434&rs=1&pid=ImgDetMain"
          />
        </div>
        <div>
          <div className="text-2xl">{greeting}</div>
          <div className="text-xl mt-1 font-semibold">admin</div>
        </div>
      </div>

      <div className="mt-10 py-10 border-t-2 border-gray-50">
        <Link
          to="/dashboard"
          className={`${baseClass} ${
            location.pathname === '/dashboard' ? activeClass : ''
          }`}
        >
          <HomeIcon />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/member"
          className={`${baseClass} mt-5 ${
            location.pathname === '/member' ? activeClass : ''
          }`}
        >
          <PeopleIcon />
          <span>Members</span>
        </Link>

        <div onClick={handleLogout} className={`${baseClass} mt-5`}>
          <LogoutIcon />
          <span>Logout</span>
        </div>

        <div className={`${baseClass} mt-5`}>
          <HelpIcon />
          <span>Help</span>
        </div>
      </div>

      <section className="bg-gradient-to-r h-[250px] mt-1 from-black cursor-pointer via-gray-900 to-black text-white py-16 px-6 ">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold ">Best Online Gym Offers</h2>
          <p className="text-lg text-gray-300 mb-4">
            Transform your fitness journey today
          </p>

          <button
            onClick={handleGetStarted}
            className="mt-1 bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold py-3 px-8 rounded-full transition"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
