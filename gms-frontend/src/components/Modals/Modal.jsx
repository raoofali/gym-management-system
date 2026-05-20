import React from 'react';
import { RxCross2 } from "react-icons/rx";

const Modal = ({handleClose,content,header}) => {
  return (
    <div className='w-full  fixed  bg-opacity-50 text-black top-0 left-0 flex justify-center'>
      <div className='w-1/2 bg-white rounded-lg h-fit mt-32 p-5'>
      <div className='flex justify-between '>
        <div className='text-4xl font-semibold'>{header}</div>
        <div className='text-4xl'onClick={()=>handleClose()}><RxCross2 /></div>
      </div>
<div className='mt-10'>{content}</div>

      </div>
    </div>
  )
}

export default Modal
