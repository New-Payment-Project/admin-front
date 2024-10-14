import { t } from "i18next";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const BankCard = ({ card }) => {
  const { t } = useTranslation();
  const getCardStyle = (issuer) => {
    switch (issuer) {
      case "Payme":
        return "bg-gradient-to-r from-blue-400 to-accent";
      case "Click":
        return "bg-gradient-to-r from-blue-500 to-blue-800";
      case "Uzum Bank":
        return "bg-gradient-to-r from-purple-400 to-purple-800";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-700";
    }
  };

  return (
    <div
      className={`w-full h-44 rounded-xl overflow-hidden ${getCardStyle(
        card.issuer
      )} text-white shadow-xl`}
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between font-mono">
          <img
            src={card.icon}
            alt={card.issuer}
            className="w-20 h-20 object-contain" 
          />
          <span className="text-lg font-bold">{card.issuer}</span>
        </div>
       
        <div className="flex justify-end items-center gap-2 font-bold font-mono">
          <span>
            {Math.floor(card.price)
              .toString() 
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
          </span>
          <p>uzs</p>
        </div>
      </div>
    </div>
  );
};

export default function Component() {
  const initialCards = [
    {
      issuer: "Payme",
      name: "Norbekov Abduvaliy",
      icon: "https://api.logobank.uz/media/logos_png/payme-01.png",
      price: "0",
    },
    {
      issuer: "Click",
      name: "Norbekov Abduvaliy",
      icon: "https://pr.uz/wp-content/uploads/2023/04/click-01.png",
      price: "0",
    },
    {
      issuer: "Uzum Bank",
      name: "Norbekov Abduvaliy",
      icon: "https://depozit.uz/image_uploads/banks/55/original/1f135319fd6cc7502052a2a5b74831b5_webp.webp",
      price: "0",
    },
  ];

  const [cards] = useState(initialCards);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">{t('my-bank-cards')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <BankCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}
