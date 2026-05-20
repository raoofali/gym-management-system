import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [loginField, setLoginField] = useState({ UserName: '', password: '' });

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  const handleLogin = async () => {
    const { UserName, password } = loginField;

    if (!UserName || !password) {
      alert('Please enter username and password');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        userName: UserName,
        password: password,
      });

      sessionStorage.setItem('isLogin', true);
      sessionStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/dashboard');
    } catch (err) {
      if (err.response?.data?.error) {
        alert('Login failed: ' + err.response.data.error);
      } else {
        alert('Something went wrong. Try again.');
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 md:mt-20 md:ml-20 bg-gray-50/20 h-fit">
      <div className="font-sans text-center text-3xl text-white">Login</div>

      <input
        value={loginField.UserName}
        onChange={(event) => handleOnChange(event, 'UserName')}
        type="text"
        placeholder="Enter User Name"
        className="w-full my-8 p-2 rounded-lg bg-white"
      />

      <input
        value={loginField.password}
        onChange={(event) => handleOnChange(event, 'password')}
        type="password"
        placeholder="Enter Password"
        className="w-full mb-8 p-2 rounded-lg bg-white"
      />

      <div
        className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </div>
    </div>
  );
};

export default Login;
