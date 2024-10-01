import React from 'react'
import { BiSolidError } from "react-icons/bi";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

  return (
    <div className='text-2xl w-full h-screen font-semibold flex flex-col justify-center items-center'>
        <div className='flex items-center border border-red-500 p-5 mb-2'><BiSolidError size={60}/> Что-то пошло не так</div>
        <button onClick={() => navigate(-1)} className='text-lg animate-pulse hover:animate-none text-blue-500 underline-offset-4 underline flex items-center'><IoArrowBackCircle size={25}/>Назад</button>
    </div>
  )
}

export default NotFound