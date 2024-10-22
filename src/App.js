import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar/Sidebar';
import HeaderBox from './components/HeaderBox/HeaderBox';
import TotalBalanceBox from './components/TotalBalanceBox/TotalBalanceBox';
import MobileNav from './components/MobileNav/MobileNav';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setStartDate, setEndDate, setTotalAmount, setPaymentData } from './slices/filterSlice';
import axios from 'axios';

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { startDate, endDate, totalAmount, paymentData } = useSelector((state) => state.filter);
  const [orders, setOrders] = React.useState([]);
  const [filteredOrders, setFilteredOrders] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`);
        const fetchedOrders = response.data.data;
        setOrders(fetchedOrders);
        setFilteredOrders(fetchedOrders); 
        setLoading(false);
      } catch (err) {
        setError(t('fetch-failed'));
        setLoading(false);
      }
    };

    fetchOrders();
  }, [t]);

  // Function to filter orders based on date and calculate the total balance
  useEffect(() => {
    const filterOrders = () => {
      let filtered = orders;

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        filtered = orders.filter((order) => {
          const orderDate = new Date(order.create_time);
          return orderDate >= start && orderDate <= end;
        });
      }

      setFilteredOrders(filtered);

      // Calculate total for filtered orders
      const paidOrders = filtered.filter((order) => order.status === 'ОПЛАЧЕНО');
      const total = paidOrders.reduce((acc, order) => acc + order.amount, 0);
      dispatch(setTotalAmount(total));

      // Update payment data for the chart
      const clickCount = filtered.filter((order) => order.paymentType === 'Click').length;
      const paymeCount = filtered.filter((order) => order.paymentType === 'Payme').length;
      const uzumCount = filtered.filter((order) => order.paymentType === 'Uzum').length;

      dispatch(setPaymentData([clickCount, paymeCount, uzumCount]));
    };

    filterOrders();
  }, [startDate, endDate, orders, dispatch]);

  const loggedIn = { firstname: 'Asilbek', lastName: 'Karimov' };
  const name = 'Norbekov';

  const nameAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="root-layout flex items-center max-h-[7%] min-h-[7%] justify-between h-full md:p-7 w-full overflow-x-hidden">
        <img src="/norbekov-logo.png" width={60} height={60} alt="menu icon" />
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
                  <motion.span initial="hidden" animate="visible" variants={nameAnimation}>
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
                paymentData={paymentData}
              />
            </div>
          </header>

          <main className="font-inter flex-1" style={{ userSelect: 'none' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
