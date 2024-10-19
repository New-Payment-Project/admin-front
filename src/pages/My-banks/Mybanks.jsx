import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const BankCard = ({ card }) => {
  const getCardStyle = (issuer) => {
    switch (issuer) {
      case 'Payme':
        return 'from-blue-400 to-teal-400'
      case 'Click':
        return 'from-blue-500 to-blue-700'
      case 'Uzum Bank':
        return 'from-purple-400 to-purple-700'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  return (
    <div className={`bg-gradient-to-br ${getCardStyle(card.issuer)} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex justify-between items-start mb-12">
        <img src={card.icon} alt={card.issuer} className="w-16 h-16 object-contain" />
        <h3 className="text-xl font-bold">{card.issuer}</h3>
      </div>
      <div className="text-right">
        <p className="text-3xl font-bold">{card.price.toLocaleString()} uzs</p>
      </div>
    </div>
  )
}

export default function Component() {
  const { t } = useTranslation()
  const [cards, setCards] = useState([
    { issuer: 'Payme', icon: 'https://api.logobank.uz/media/logos_png/payme-01.png', price: 0 },
    { issuer: 'Click', icon: 'https://pr.uz/wp-content/uploads/2023/04/click-01.png', price: 0 },
    { issuer: 'Uzum Bank', icon: 'https://depozit.uz/image_uploads/banks/55/original/1f135319fd6cc7502052a2a5b74831b5_webp.webp', price: 0 },
  ])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_TEST}/orders`)
        processOrders(response.data.data)
        setLoading(false)
      } catch (err) {
        setError(t('fetch-failed'))
        setLoading(false)
      }
    }

    fetchOrders()
  }, [t])

  const processOrders = (orders) => {
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.create_time);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (
        order.status === 'ОПЛАЧЕНО' &&
        (!start || orderDate >= start) &&
        (!end || orderDate <= end)
      );
    });
  
    const totals = {
      Payme: 0,
      Click: 0,
      'Uzum Bank': 0,
    };
  
    filteredOrders.forEach((order) => {
      const paymentType = order.paymentType;
      if (!paymentType) {
        console.log(`Missing paymentType for order:`, order);
        return;
      }
  
      if (totals.hasOwnProperty(paymentType)) {
        const amount = Number(order.amount);
        if (!isNaN(amount)) {
          // Check if paymentType is not "Click", divide by 100
          totals[paymentType] += paymentType !== "Click" ? amount / 100 : amount;
        } else {
          console.error(`Invalid amount for order:`, order);
        }
      } else {
        console.error(`Unexpected paymentType: ${paymentType}`);
      }
    });
  
    const totalSum = Object.values(totals).reduce((acc, val) => acc + val, 0);
  
    setTotalAmount(totalSum);
  
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        price: totals[card.issuer] || 0,
      }))
    );
  };
  

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-gray-800">{t('my-bank-cards')}</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('filter-start-date')}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('filter-end-date')}
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <button className="btn btn-square loading"></button>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <BankCard key={index} card={card} />
          ))}
        </div>
      )}
    </div>
  )
}
