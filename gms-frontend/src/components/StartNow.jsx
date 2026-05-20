import React from 'react';

const StartNow = () => {
  return (

    <div className='  h-[100vh]  w-3/4 bg-cover bg-center'
        style={{
          backgroundImage: `url("https://getwallpapers.com/wallpaper/full/3/1/b/200524.jpg")`,
        }}>
    <div className="text-white min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Power Zone Gym 🏋️</h1>
      
      <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
        <img
          src="https://th.bing.com/th/id/OIP.2AEM4GD9w5_mN_XCNlA_lgHaE8?rs=1&pid=ImgDetMain"
          alt="gym"
          className="w-full md:w-1/2 rounded-xl shadow-xl"
        />

        <div className="text-lg max-w-lg text-gray-200">
          <p className="mb-4">
            💪 Unlock your full potential with our top-notch trainers, modern equipment, and flexible plans.
          </p>
          <p className="mb-4">
            ✅ Whether you're a beginner or a pro, Power Zone is your fitness partner for life!
          </p>
          <p className="mb-4">
            🔥 Join now and get <span className="text-yellow-400 font-bold">50% OFF</span> on your first month!
          </p>

          <button className="mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition">
            Join Now
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default StartNow;
