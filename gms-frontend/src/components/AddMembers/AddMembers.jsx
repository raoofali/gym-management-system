import React, { useState } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

const AddMembers = ({ onMemberAdded }) => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    joiningDate: "",
  });

  const [loaderImage, setLoaderImage] = useState(false);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/member/add-member",
        inputField
      );
      alert("Member registered successfully!");
      console.log(res.data);

      // 👇 Call parent's refresh function after adding member
      if (onMemberAdded) {
        onMemberAdded();
      }

      setInputField({
        name: "",
        mobileNo: "",
        address: "",
        membership: "",
        profilePic: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        joiningDate: "",
      });
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Failed to register member.");
    }
  };

  const uploadImage = async (event) => {
    setLoaderImage(true);
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dk1dbaqwp/image/upload",
        data
      );
      const imageUrl = response.data.secure_url;
      setInputField({ ...inputField, profilePic: imageUrl });
      setLoaderImage(false);
    } catch (err) {
      console.error("Image upload failed", err);
      setLoaderImage(false);
      alert("Image upload failed!");
    }
  };

  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
        <input
          value={inputField.name}
          onChange={(e) => handleOnChange(e, "name")}
          type="text"
          placeholder="Name of the Joinee"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.mobileNo}
          onChange={(e) => handleOnChange(e, "mobileNo")}
          type="text"
          placeholder="Mobile No"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.address}
          onChange={(e) => handleOnChange(e, "address")}
          type="text"
          placeholder="Enter Address"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />
        <input
          value={inputField.joiningDate}
          onChange={(e) => handleOnChange(e, "joiningDate")}
          type="date"
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <input
          value={inputField.mobileNo}
          onChange={(e) => handleOnChange(e, "mobileNo")}
          type="text"
          placeholder="Enter Father Name "
          className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        />

        <select
          value={inputField.membership}
          onChange={(e) => handleOnChange(e, "membership")}
          className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray"
        >
          <option value="">Select Membership</option>
          <option value="1 Month Membership">1 Month Membership</option>
          <option value="2 Month Membership">2 Month Membership</option>
          <option value="3 Month Membership">3 Month Membership</option>
          <option value="4 Month Membership">4 Month Membership</option>
          <option value="5 Month Membership">5 Month Membership</option>
          <option value="6 Month Membership">6 Month Membership</option>
          <option value="7 Month Membership">7 Month Membership</option>
          <option value="8 Month Membership">8 Month Membership</option>
        </select>

        <input type="file" onChange={(e) => uploadImage(e)} />

        <div className="w-1/4">
          <img
            src={inputField.profilePic}
            className="w-full h-full rounded-full"
            alt="Profile"
          />
          {loaderImage && (
            <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
        </div>

        <div
          className="p-3 border-2 w-28 text-lg h-14 text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          onClick={handleSubmit}
        >
          Register
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
