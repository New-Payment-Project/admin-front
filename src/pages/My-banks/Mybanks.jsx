import React, { useState } from "react"

const BankCard = ({ card }) => {
  const getCardStyle = (issuer) => {
    switch (issuer) {
      case "Payme":
        return "bg-gradient-to-r from-blue-500 to-blue-800"
      case "Click":
        return "bg-gradient-to-r from-green-500 to-green-900"
      case "Uzum Bank":
        return "bg-gradient-to-r from-purple-500 to-purple-900"
      case "MasterCard":
        return "bg-gradient-to-r from-red-500 to-yellow-700"
      default:
        return "bg-gradient-to-r from-gray-500 to-gray-700"
    }
  }

  return (
    <div className={`w-full max-w-[280px] h-44 rounded-xl overflow-hidden ${getCardStyle(card.issuer)} text-white shadow-xl`}>
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start">
          <img src={card.icon} alt={card.issuer} className="w-12 h-12 object-contain" />
          <span className="text-lg font-bold">{card.issuer}</span>
        </div>
        <div className="space-y-2">
          <div className="text-lg tracking-wider">{card.number}</div>
          <div className="flex justify-between text-sm">
            <div>
              <div className="text-xs opacity-75">Card Holder</div>
              <div>{card.name}</div>
            </div>
            <div>
              <div className="text-xs opacity-75">Expires</div>
              <div>{card.expiry}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Component() {
  const initialCards = [
    {
      issuer: "Payme",
      number: "1234 1234 1234 1234",
      name: "Norbekov Abduvaliy",
      expiry: "06/24",
      icon: "https://api.logobank.uz/media/logos_png/payme-01.png",
    },
    {
      issuer: "Click",
      number: "1234 1234 1234 1234",
      name: "Norbekov Abduvaliy",
      expiry: "06/24",
      icon: "https://pr.uz/wp-content/uploads/2023/04/click-01.png",
    },
    {
      issuer: "Uzum Bank",
      number: "1234 1234 1234 1234",
      name: "Norbekov Abduvaliy",
      expiry: "06/24",
      icon: "https://depozit.uz/image_uploads/banks/55/original/1f135319fd6cc7502052a2a5b74831b5_webp.webp",
    },
    {
      issuer: "MasterCard",
      number: "5678 5678 5678 5678",
      name: "Norbekov Abduvaliy",
      expiry: "09/26",
      icon: "https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg",
    },
  ]

  const [cards] = useState(initialCards)

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Bank Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <BankCard key={index} card={card} />
        ))}
      </div>
    </div>
  )
}
