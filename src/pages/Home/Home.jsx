"use client";

import { useState } from 'react'
import { ArrowRightIcon, } from "lucide-react"
import Charts from './Charts'

export default function Home() {
  const [activeTab, setActiveTab] = useState("chase");

  return (
    <div className="flex h-screen bg-gray-100 rounded-xl">
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, Abdulloh</h1>
        <p className="text-gray-600 mb-8">
          Access & manage your account and transactions efficiently.
        </p>


        <Charts />
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">2 Bank Accounts</h2>
            </div>
            <div className="flex items-center">
              <div className="w-32 h-32 rounded-full border-[16px] border-blue-200 border-t-blue-600"></div>
              <div className="ml-6">
                <p className="text-sm text-gray-500">Total Current Balance</p>
                <p className="text-4xl font-bold">$2,698.12</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent transactions</h2>
          <button className="text-blue-600 flex items-center text-sm">
            View all
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </button>
        </div>

        <div className=" rounded-lg shadow-md">
          <div className="flex border-b">
            {["chase", "boa", "fpb"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 ${activeTab === tab ? "border-b-2 border-blue-600" : ""
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "chase"
                  ? "Chase Bank"
                  : tab === "boa"
                    ? "Bank of America"
                    : "First Platypus Bank"}
              </button>
            ))}
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  CB
                </div>
                <div>
                  <p className="font-semibold">Chase Bank</p>
                  <p className="text-blue-600 font-bold">$2,588.12</p>
                </div>
              </div>
              <span className="text-green-600 text-sm bg-green-100 px-2 py-1 rounded-full">
                savings
              </span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm">
                  <th className="pb-2">Transaction</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Category</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 ">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <span className="text-green-600 text-xs">S</span>
                      </div>
                      <span>Spotify</span>
                    </div>
                  </td>
                  <td className="py-2 text-red-500">- $15.00</td>
                  <td className="py-2">
                    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                      Processing
                    </span>
                  </td>
                  <td className="py-2 text-sm text-gray-500">Wed 1:00pm</td>
                  <td className="py-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Subscriptions
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                        AD
                      </div>
                      <span>Alexa Doe</span>
                    </div>
                  </td>
                  <td className="py-2 text-green-500">+ $88.00</td>
                  <td className="py-2">
                    <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">
                      Success
                    </span>
                  </td>
                  <td className="py-2 text-sm text-gray-500">Wed 2:45am</td>
                  <td className="py-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Deposit
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </div>
  );
}
