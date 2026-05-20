// ✅ MemberCard.jsx
import React from 'react';
import CircleIcon from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

const MemberCard = ({ member }) => {
  return (
    <Link
      to={`/member/${member._id}`}
      className='border-2 border-white text-white bg-slate-950 hover:bg-slate-800 cursor-pointer p-4 transition-all duration-300 shadow-md rounded-lg'
    >
      <div className='relative w-28 h-28 flex justify-center items-center border-2 p-1 rounded-full mx-auto mt-2'>
        <img
          className='w-full h-full rounded-full object-cover'
          src={member.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt="profile"
        />
        <CircleIcon className='absolute top-1 left-1 text-green-500' fontSize='small' />
      </div>

      <div className='mx-auto mt-5 text-center text-xl font-semibold font-mono'>
        {member.name}
      </div>
      <div className='text-center text-lg font-mono mt-1'>Mobile: {member.mobileNo || member.phone}</div>
      <div className='text-center text-sm font-mono mt-1'>Join Date: {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}</div>
      <div className='text-center text-sm font-mono mt-1'>Expire Date: {member.expireDate ? new Date(member.expireDate).toLocaleDateString() : 'N/A'}</div>
      <div className='text-center text-sm font-mono mt-1'>Status: {member.status}</div>
    </Link>
  );
};

export default MemberCard;