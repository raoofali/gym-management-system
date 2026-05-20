// MemberList functionality has been fully merged into this Member.jsx file.
// You can safely delete the previous MemberList.jsx file from your project.

import React, { useState, useEffect } from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MemberCard from '../MemberCard/MemberCard';
import Modal from '../Modals/Modal';
import AddMembership from '../AddMembership/AddMembership';
import AddMembers from '../AddMembers/AddMembers';
import axios from 'axios';

const Member = () => {
  const [addMembership, setAddMemberShip] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(9);
  const [noOfPage, setNoOfPage] = useState(0);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/member/get-members?page=${currentPage}&limit=${limit}`);
      const { members, totalMembers, totalPages } = res.data;

      setMembers(members);
      setTotalData(totalMembers);
      setNoOfPage(totalPages);

      const from = (currentPage - 1) * limit;
      const to = from + members.length;
      setStartFrom(from);
      setEndTo(to);
    } catch (err) {
      console.error("Failed to fetch members", err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/member/search?term=${searchTerm}`);
      setMembers(res.data);
      setTotalData(res.data.length);
      setNoOfPage(1);
      setCurrentPage(1);
      setStartFrom(0);
      setEndTo(res.data.length);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm === "") {
      fetchData();
    }
  }, [searchTerm]);

  const handleMembership = () => setAddMemberShip(prev => !prev);
  const handleMember = () => setAddMember(prev => !prev);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < noOfPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="w-full md:w-3/4 mx-auto h-full bg-cover bg-center"
      style={{ backgroundImage: `url("https://getwallpapers.com/wallpaper/full/3/1/b/200524.jpg")` }}>

      <div className="flex justify-between items-center w-full text-white p-4">
        <div className="text-lg font-medium flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black transition-all duration-300"
          onClick={handleMember}>
          <span>Add Member</span>
          <FitnessCenterIcon />
        </div>

        <div className="text-lg font-medium flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black transition-all duration-300"
          onClick={handleMembership}>
          <span>Membership</span>
          <AddIcon />
        </div>
      </div>

      <hr className="border-t border-white opacity-80" />

      <Link to="/dashboard" className="mt-5 inline-flex items-center gap-2 text-white hover:text-indigo-400 transition duration-200">
        <ArrowBackIcon className="text-xl" />
        <span className="font-medium">Back to Dashboard</span>
      </Link>

      <div className='mt-5 w-1/2 flex gap-2'>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-full p-2 placeholder:pl-5 text-white border-1 rounded-lg'
          placeholder='Search By Name or Mobile No'
        />
        <div
          className='bg-slate-900 p-3 text-white rounded-lg cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black'
          onClick={handleSearch}
        >
          <SearchIcon />
        </div>
      </div>

      <div className='mt-5 text-xl flex justify-between text-white'>
        <div>Total Members</div>
        <div className='flex gap-5'>
          <div>{startFrom + 1}-{endTo} of {totalData} Members</div>
          <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === 1 ? 'bg-gray-200 text-gray-400' : ''}`} onClick={handlePrev}>
            <KeyboardArrowLeftIcon />
          </div>
          <div className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ${currentPage === noOfPage ? 'bg-gray-200 text-gray-400' : ''}`} onClick={handleNext}>
            <KeyboardArrowRightIcon />
          </div>
        </div>
      </div>
<div className="overflow-x-auto">
  <div className="mt-5 rounded-lg grid gap-2 grid-cols-3  h-[534px] ">
    {members.map((member) => (
      <div key={member._id} className="">
        <MemberCard member={member} />
      </div>
    ))}
  </div>
</div>


      {addMembership && <Modal header='Add Membership' handleClose={handleMembership} content={<AddMembership />} />}
      {addMember && <Modal header='Add New Members' handleClose={handleMember} content={<AddMembers onMemberAdded={fetchData} />} />}
    </div>
  );
};

export default Member;
