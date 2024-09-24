import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import loginImg from "../assets/login-bg.jpeg";
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

const Login = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);  
    try {
      // Send user data (without hashing password) to the backend
      const response = await axios.post('https://payment-server-vo2y.onrender.com/api/auth/login', data);
  
      const token = response.data.token;
  
      // Hash the token using CryptoJS
      const hashedToken = CryptoJS.SHA256(token).toString();  // Example with SHA256
  
      // Store the hashed token in localStorage
      localStorage.setItem('login', hashedToken);
      localStorage.setItem('token', JSON.stringify(response.data.token))
      // Dispatch the login action to update Redux state
      dispatch(login(response.data));
  
      // Show success notification
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      // Navigate to the home page
      navigate('/');
    } catch (error) {
      // Show error notification
      toast.error("Login failed. Please check your credentials.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setLoading(false);  
    }
  };  

  return (
    <div className='flex h-screen bg-white'>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
      
      <div className='flex flex-col justify-center lg:w-1/2 p-10 bg-white'>
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className='container mx-auto max-w-md'
        >
          <h1 className='text-3xl text-black font-semibold mb-4'>Log in</h1>
          <p className='text-gray-600 mb-8'>Welcome back! Please enter your details.</p>
          
          <div className="mb-6">
            <label 
              htmlFor="login" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Your login
            </label>
            <input 
              type="text" 
              id="login" 
              {...register("login", { 
                required: "Login is required", 
              })} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
              placeholder="name@domain.com"
            />
            {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>}
          </div>

          <div className="mb-6">
            <label 
              htmlFor="password" 
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Your password
            </label>
            <input 
              type="password" 
              id="password" 
              {...register("password", { 
                required: "Password is required", 
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })} 
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <button 
            type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center flex items-center justify-center"
            disabled={loading} 
          >
            {loading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Log in"
            )}
          </button>
        </form>
      </div>

      <div className='w-1/2 h-full flex justify-center items-center rounded-r-lg relative'>
        <img 
          src={loginImg} 
          alt="Login visual" 
          className='object-contain h-3/4 w-3/4' 
        />
      </div>
    </div>
  );
}

export default Login;
