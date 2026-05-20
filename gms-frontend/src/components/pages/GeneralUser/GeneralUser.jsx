import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from '../../MemberCard/MemberCard';

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    if (func) {
      functionCall(func);
    }
  }, []);

  const functionCall = async (func) => {
    let endpoint = '';

    switch (func) {
      case "Monthly Joined":
        setHeader("Monthly Joined Members");
        endpoint = 'monthly-joined';
        break;
      case "Expiring Within 3 Days":
        setHeader("Expiring in 3 Days Members");
        endpoint = 'expiring-3-days';
        break;
      case "Expiring in 4-7 Days":
        setHeader("Expiring in 4–7 Days Members");
        endpoint = 'expiring-4-7-days';
        break;
      case "Expired":
        setHeader("Expired Members");
        endpoint = 'expired';
        break;
      case "Inactive Members":
        setHeader("Inactive Members");
        endpoint = 'inactive';
        break;
      default:
        setHeader("Members");
        break;
    }

    if (endpoint) {
      try {
        const res = await fetch(`http://localhost:5000/api/members/${endpoint}`);
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Error fetching members", err);
      }
    }
  };

  return (
    <div className='text-black p-5 w-3/4 flex-col h-[100vh] bg-gradient-to-br from-[#1a1a2e] to-[#4b0082]/70 via-[#000000]'>
      
      {/* Top bar with Back Button */}
      <div className='bg-slate-900 justify-center w-full text-white rounded-lg p-3'>
        <Link to={'/dashboard'} className='pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      {/* Header title */}
      <div className='mt-5 text-xl text-white'>
        {header}
      </div>

      {/* Member cards */}
      <div className='bg-white text-white p-8 mt-5 rounded-lg grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto h-[65%]'>
        {members.length > 0 ? (
          members.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))
        ) : (
          <p className='col-span-full text-black'>No members found.</p>
        )}
      </div>
    </div>
  );
};

export default GeneralUser;
