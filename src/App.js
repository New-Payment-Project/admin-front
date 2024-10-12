import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar/Sidebar';
import HeaderBox from './components/HeaderBox/HeaderBox';
import TotalBalanceBox from './components/TotalBalanceBox/TotalBalanceBox';
import MobileNav from './components/MobileNav/MobileNav';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const App = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://course-server-327v.onrender.com/api/v1/orders"
        );
        setOrders(response.data.data);
        console.log(response.data.data);
  
        const paidOrders = response.data.data.filter(
          (order) => order.status === "ОПЛАЧЕНО"
        );
  
        const total = paidOrders.reduce((acc, order) => {
          return acc + order.amount;
        }, 0);
  
        setTotalAmount(total);

        setLoading(false);
      } catch (err) {
        setError(t("fetch-failed"));
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [t]);
  
  const loggedIn = { firstname: "Asilbek", lastName: "Karimov" };
  const name = localStorage.getItem('name') || 'Guest';

  const nameAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
  };

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='root-layout flex items-center justify-between h-full md:p-7 w-full overflow-x-hidden'>
        <img src='/norbekov-logo.png' width={60} height={60} alt='menu icon' />
        <MobileNav user={loggedIn} />
      </div>
    
      <div className="flex flex-1">
        <aside className="h-full z-50 top-0 left-0 bg-gray-100" style={{ userSelect: 'none' }}>
          <Sidebar user={loggedIn} />
        </aside>

        <div className="flex-1">
          <header className="home home-header">
            <div className="home-content">
              <HeaderBox
                type="greeting"
                title={t('welcome')}
                user={
                  <motion.span
                    initial="hidden"
                    animate="visible"
                    variants={nameAnimation}
                  >
                    {name}
                  </motion.span>
                }
                subtext={t('welcome-desc')}
              />
              
              <TotalBalanceBox
                accounts={[]}
                totalBanks={1}
                totalCurrentBalance={totalAmount}
                loading={loading}
              />
            </div>
          </header>

          <main className="font-inter flex-1" style={{ userSelect: 'none' }} >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;