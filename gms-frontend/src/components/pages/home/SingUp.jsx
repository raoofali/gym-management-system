import React, { useState } from 'react';
import Modal from '../../Modals/Modal';
import ForgotPassword from '../../ForgotPassword/ForgotPassword';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const SingUp = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [loaderImage, setLoaderImage] = useState(false);
  const [inputField, setInputField] = useState({
    gymName: '',
    email: '',
    userName: '',
    password: '',
    profilePic:
      'https://th.bing.com/th/id/R.df7067802b37cc37b7405c1bba3aca5d?rik=7Io4BMxLXDQt6Q&pid=ImgRaw&r=0&sres=1&sresct=1',
  });

  const handleClose = () => {
    setForgotPassword((prev) => !prev);
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    setLoaderImage(true);
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gym-management');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dk1dbaqwp/image/upload',
        data
      );
      const imageUrl = response.data.secure_url;
      setInputField({ ...inputField, profilePic: imageUrl });
    } catch (err) {
      console.log(err);
      alert('Image upload failed!');
    } finally {
      setLoaderImage(false);
    }
  };

  const handleRegister = async () => {
    const { gymName, email, userName, password, profilePic } = inputField;

    if (!gymName || !email || !userName || !password) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        gymName,
        email,
        userName,
        password,
        profilePic,
      });

      alert('Gym Registered Successfully!');
      setInputField({
        gymName: '',
        email: '',
        userName: '',
        password: '',
        profilePic: '',
      });
    } catch (err) {
      if (err.response?.data?.error) {
        alert('Error: ' + err.response.data.error);
      } else {
        alert('Registration failed. Try again.');
      }
    }
  };

  return (
    <>
      <div className="customSingup w-full max-w-md md:w-1/3 p-10 md:mt-20 md:ml-20 bg-gray-50/20 max-h-[60vh] overflow-y-auto">
        <div className="font-sans text-center text-3xl text-white">
          Register Your Gym
        </div>

        <input
          value={inputField.email}
          onChange={(event) => {
            handleOnChange(event, 'email');
          }}
          type="text"
          placeholder="Enter Email"
          className="w-full my-10 p-2 rounded-lg bg-white"
        />

        <input
          value={inputField.gymName}
          onChange={(event) => {
            handleOnChange(event, 'gymName');
          }}
          type="text"
          placeholder="Enter Gym Name"
          className="w-full mb-10 p-2 rounded-lg bg-white"
        />

        <input
          value={inputField.userName}
          onChange={(event) => {
            handleOnChange(event, 'userName');
          }}
          type="text"
          placeholder="Enter User Name"
          className="w-full mb-10 p-2 rounded-lg bg-white"
        />

        <input
          value={inputField.password}
          onChange={(event) => {
            handleOnChange(event, 'password');
          }}
          type="password"
          placeholder="Enter Password"
          className="w-full mb-10 p-2 rounded-lg bg-white"
        />

        <input
          type="file"
          onChange={(e) => uploadImage(e)}
          className="w-full mb-10 p-2 rounded-lg opacity-100 hover:bg-amber-200"
        />

        <div className="pb-7">
          {loaderImage && (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="secondary" />
            </Stack>
          )}
        </div>

        <img
          src={inputField.profilePic}
          className="h-[200px] w-[250px] -mt-7 mx-auto"
        />

        <div
          onClick={handleRegister}
          className="cursor-pointer p-2 mt-5 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold"
        >
          Register
        </div>

        <div
          className="cursor-pointer p-2 mt-5 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold"
          onClick={() => handleClose()}
        >
          Forgot Password
        </div>

        {forgotPassword && (
          <Modal
            header="Forgot Password"
            handleClose={handleClose}
            content={<ForgotPassword />}
          />
        )}
      </div>
    </>
  );
};

export default SingUp;
