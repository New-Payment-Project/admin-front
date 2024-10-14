import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';
import CryptoJS from 'crypto-js';
import LogoutModal from '../LogoutModal/LogoutModal';
import { TbLogout } from "react-icons/tb";

const UserInfo = () => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const [username, setUsername] = useState();
  const secretKey = process.env.REACT_APP_SECRET_KEY || "your-secret-key";

  useEffect(() => {
    const encryptedLogin = localStorage.getItem('login');
    
    if (!encryptedLogin) {
      console.error('Encrypted login is missing in local storage.');
      return;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedLogin, secretKey);
      const decryptedLogin = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedLogin) {
        setUsername(decryptedLogin);
      } else {
        console.error('Decrypted login is not in the expected format.');
      }
    } catch (error) {
      console.error('Error decrypting login:', error);
    }
  }, [secretKey]);

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    dispatch(logout());
    modalRef.current.close();
  };

  const openModal = () => {
    modalRef.current.showModal();
  };

  return (
    <div>
      <div className='flex items-center lg:justify-between justify-center w-full'>
        {username && <p className='text-gray-600 px-1 py-2 rounded-lg'>{username}</p>}
        <button onClick={openModal} className='text-red-500 text-2xl hover:bg-base-300 p-2 rounded-full duration-300'>
            <TbLogout/> 
        </button>
      </div>
      <LogoutModal confirmLogout={confirmLogout} modalRef={modalRef} />
    </div>
  );
};

export default UserInfo;