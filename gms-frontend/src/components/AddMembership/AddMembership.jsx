import React, { useState } from 'react';
import axios from 'axios';

const AddMembership = () => {
  const [inputField, setInputField] = useState({ months: '', price: '' });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleAdd = async () => {
    const { months, price } = inputField;

    if (!months || !price) {
      alert("Please fill both fields");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/membership/add', {
        months: parseInt(months),
        price: parseInt(price)
      });

      alert(res.data.message);
      setInputField({ months: '', price: '' });
    } catch (err) {
      console.error("Add membership failed:", err);
      alert("Failed to add membership");
    }
  };

  return (
    <div className='text-black'>
      <div className='flex flex-wrap gap-5 items-center justify-center'>
        <div className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 pt-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          <div>1 Month Membership</div>
          <div>RS 1000</div>
        </div>

        <div className='text-lg bg-slate-900 text-white border-2 pl-2 pr-2 pt-1 rounded-xl font-semibold hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
          <div>2 Months Membership</div>
          <div>RS 2000</div>
        </div>
      </div>

      <hr className='mt-10 mb-10' />

      <div className='flex gap-10 mb-10'>
        <input
          value={inputField.months}
          onChange={(event) => handleOnChange(event, 'months')}
          type="number"
          className='border-2 rounded-lg text-lg w-1/3 p-2'
          placeholder='Add No. of Months'
        />

        <input
          value={inputField.price}
          onChange={(event) => handleOnChange(event, 'price')}
          type="number"
          className='border-2 rounded-lg text-lg w-1/3 p-2'
          placeholder='Add Price'
        />

        <div
          onClick={handleAdd}
          className='text-lg border-2 rounded-xl w-fit px-6 py-2 flex justify-center items-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
        >
          Add +
        </div>
      </div>
    </div>
  );
};

export default AddMembership;
