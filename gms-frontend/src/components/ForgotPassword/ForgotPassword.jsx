import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentValue, setContentValue] = useState("Submit Your Email");
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: ""
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!emailSubmit) {
        // ✅ Step 1: Send OTP to email
        const res = await axios.post("http://localhost:5000/api/otp/send-otp", {
          email: inputField.email
        });
        alert("OTP Sent Successfully!");
        setEmailSubmit(true);
        setContentValue("Submit Your OTP");
      } else if (emailSubmit && !otpValidate) {
        // ✅ Step 2: Validate OTP
        const res = await axios.post("http://localhost:5000/api/otp/verify-otp", {
          email: inputField.email,
          otp: inputField.otp
        });
        alert("OTP Verified!");
        setOtpValidate(true);
        setContentValue("Submit Your New Password");
      } else if (otpValidate) {
        // ✅ Step 3: Set New Password
        const res = await axios.post("http://localhost:5000/api/otp/reset-password", {
          email: inputField.email,
          newPassword: inputField.newPassword
        });
        alert("Password Reset Successfully!");
        // ✅ Reset all states
        setEmailSubmit(false);
        setOtpValidate(false);
        setContentValue("Submit Your Email");
        setInputField({ email: "", otp: "", newPassword: "" });
      }
    } catch (error) {
      alert("Error: " + (error?.response?.data?.error || "Something went wrong"));
      console.error(error);
    }
  };

  return (
    <div className='w-full'>
      {/* Email */}
      <div className='w-full mb-5'>
        <div>Enter Your Email</div>
        <input
          value={inputField.email}
          onChange={(event) => handleOnChange(event, "email")}
          type="text"
          placeholder="Enter Email"
          className="w-1/2 border-2 border-slate-400 p-2 rounded-lg bg-white"
        />
      </div>

      {/* OTP */}
      {emailSubmit && (
        <div className='w-full mb-5'>
          <div>Enter Your OTP</div>
          <input
            value={inputField.otp}
            onChange={(event) => handleOnChange(event, "otp")}
            type="text"
            placeholder="Enter OTP"
            className="w-1/2 border-2 border-slate-400 p-2 rounded-lg bg-white"
          />
        </div>
      )}

      {/* New Password */}
      {otpValidate && (
        <div className='w-full mb-5'>
          <div>Enter Your New Password</div>
          <input
            value={inputField.newPassword}
            onChange={(event) => handleOnChange(event, "newPassword")}
            type="password"
            placeholder="Enter Your New Password"
            className="w-1/2 border-2 border-slate-400 p-2 rounded-lg bg-white"
          />
        </div>
      )}

      {/* Submit Button */}
      <div
        className='bg-slate-800 text-white mx-auto w-2/3 p-3 cursor-pointer border-2 rounded-lg text-center font-semibold hover:bg-amber-100 hover:text-black'
        onClick={handleSubmit}
      >
        {contentValue}
      </div>
    </div>
  );
};

export default ForgotPassword;
