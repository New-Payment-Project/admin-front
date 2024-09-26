import React, { useState } from "react";

const BankCard = ({ card }) => {
  const getCardStyle = (issuer) => {
    switch (issuer) {
      case "Payme":
        return "bg-gradient-to-r from-blue-500 to-blue-800";
      case "Click":
        return "bg-gradient-to-r from-green-500 to-green-900";
      case "Uzum Bank":
        return "bg-gradient-to-r from-purple-500 to-purple-900";
      case "MasterCard":
        return "bg-gradient-to-r from-red-500 to-yellow-700";
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-700";
    }
  };

  return (
    <div
      className={`w-full max-w-[280px] h-44 rounded-xl overflow-hidden ${getCardStyle(
        card.issuer
      )} text-white shadow-xl`}
    >
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <img
            src={card.icon}
            alt={card.issuer}
            className="w-20 h-20 object-contain" // Updated size
          />
          <span className="text-lg font-bold">{card.issuer}</span>
        </div>
       
        <div className="flex justify-start items-center my-auto gap-2 font-bold text-xl">
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
      price: "10000000000000",
    },
    {
      issuer: "Click",
      name: "Norbekov Abduvaliy",
      icon: "https://pr.uz/wp-content/uploads/2023/04/click-01.png",
      price: "1500000000000",
    },
    {
      issuer: "Uzum Bank",
      name: "Norbekov Abduvaliy",
      icon: "https://depozit.uz/image_uploads/banks/55/original/1f135319fd6cc7502052a2a5b74831b5_webp.webp",
      price: "1500000009999",
    },
    {
      issuer: "MasterCard",

      name: "Norbekov Abduvaliy",

      icon: "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg",
      price: "150004064753",
    },
  ];

  const [cards] = useState(initialCards);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Bank Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <BankCard key={index} card={card} />
        ))}
      </div>
    </div>
  );
}
