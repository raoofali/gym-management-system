import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Switch from "@mui/material/Switch";

const MemberDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [status, setStatus] = useState("pending");
  const [renew, setRenew] = useState(false);

  useEffect(() => {
    console.log("🔍 Member ID from URL:", id);

    fetch(`http://localhost:5000/api/members/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("✅ Data fetched from backend:", data);
        setMember(data);
        setStatus(data.status || "pending");
      })
      .catch(err => console.error("❌ Error fetching member", err));
  }, [id]);

  const toggleStatus = () => {
    setStatus(prev => (prev === "Active" ? "pending" : "Active"));
  };

  if (!member) return <div className="text-white p-5">Loading...</div>;

  return (
    <div className="w-full md:w-3/4 mx-auto text-black p-5 bg-cover bg-center"
      style={{ backgroundImage: `url("https://getwallpapers.com/wallpaper/full/3/1/b/200524.jpg")` }}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 border-2 text-white p-2 rounded-xl bg-slate-900 hover:bg-slate-700 transition"
      >
        <ArrowBackIcon /> Go Back
      </button>

      <div className="mt-10 flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={member.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt="Member"
            className="rounded-lg w-64 h-auto object-cover shadow-md"
          />
        </div>

        <div className="w-full md:w-2/3 text-white text-xl p-5">
          <div className="mb-2 text-2xl font-semibold">Name: {member.name}</div>
          <div className="mb-2 text-2xl font-semibold">Mobile: {member.mobileNo}</div>
          <div className="mb-2 text-2xl font-semibold">Address: {member.address}</div>
          <div className="mb-2 text-2xl font-semibold">Joined Date: {new Date(member.joinDate).toLocaleDateString()}</div>
          <div className="mb-2 text-2xl font-semibold">Expire Date: {new Date(member.expireDate).toLocaleDateString()}</div>

          <div className="mb-4 flex items-center gap-4 text-2xl font-semibold">
            Status
            <Switch
              sx={{ color: "#6366f1" }}
              checked={status === "Active"}
              onClick={toggleStatus}
            />
            <span className={`text-sm px-2 py-1 rounded-lg ${status === "Active" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
              {status}
            </span>
          </div>

          <div
            onClick={() => setRenew((prev) => !prev)}
            className={`rounded-lg p-3 border-2 border-slate-900 text-center w-full md:w-1/2 cursor-pointer transition
            ${renew && status === "Active" ? "bg-slate-700 text-white" : "hover:bg-sky-500 hover:text-white"}`}
          >
            Renew
          </div>

          {renew && status === "Active" && (
            <div className="rounded-lg p-5 mt-6 shadow-md bg-slate-900/80">
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">Membership Plan</label>
                <select className="w-full border-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>1 Month Plan</option>
                  <option>3 Month Plan</option>
                  <option>6 Month Plan</option>
                </select>
              </div>
              <div className="mt-4 text-center">
                <button className="rounded-lg p-3 border-2 border-slate-900 w-1/2 mx-auto cursor-pointer bg-amber-300 hover:bg-amber-400 text-black font-semibold transition">
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetail;