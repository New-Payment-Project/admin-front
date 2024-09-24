import React, { useState } from "react"

const BankCard = ({ card }) => {
  const getCardStyle = (issuer) => {
    switch (issuer) {
      case "Payme":
        return "bg-gradient-to-r from-blue-500 to-blue-700"
      case "Click":
        return "bg-gradient-to-r from-green-500 to-green-700"
      case "Uzum Bank":
        return "bg-gradient-to-r from-purple-500 to-purple-700"
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
      name: " Norbekov Abduvaliy",
      expiry: "06/24",
      icon: "https://api.logobank.uz/media/logos_png/UZUM_BANK-01.png",
    },
  ]

  const [cards, setCards] = useState(initialCards)
  const [newCard, setNewCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "Payme",
    icon: "https://api.logobank.uz/media/logos_png/payme-01.png",
  })
  const [showForm, setShowForm] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCard({ ...newCard, [name]: value })
  }

  const handleIssuerChange = (e) => {
    const value = e.target.value
    let icon = ""
    if (value === "Payme") {
      icon = "https://api.logobank.uz/media/logos_png/payme-01.png"
    } else if (value === "Click") {
      icon = "https://pr.uz/wp-content/uploads/2023/04/click-01.png"
    } else if (value === "Uzum Bank") {
      icon = "https://api.logobank.uz/media/logos_png/UZUM_BANK-01.png"
    }
    setNewCard({ ...newCard, issuer: value, icon })
  }

  const addCard = () => {
    setCards([...cards, newCard])
    setNewCard({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "Payme",
      icon: "https://api.logobank.uz/media/logos_png/payme-01.png",
    })
    setShowForm(false)
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">My Bank Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <BankCard key={index} card={card} />
        ))}
      </div>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Add New Card
        </button>
      )}

      {showForm && (
        <div className="mt-4 bg-white shadow-md rounded-lg p-4">
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="issuer" className="block text-sm font-medium text-gray-700">
                Select Card Type
              </label>
              <select
                id="issuer"
                name="issuer"
                value={newCard.issuer}
                onChange={handleIssuerChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="Payme">Payme</option>
                <option value="Click">Click</option>
                <option value="Uzum Bank">Uzum Bank</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="number"
                name="number"
                placeholder="Card Number"
                value={newCard.number}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Cardholder Name"
                value={newCard.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={newCard.expiry}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="CVC"
                  value={newCard.cvc}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <button
              onClick={addCard}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            >
              Add Card
            </button>
          </div>
        </div>
      )}
    </div>
  )
}