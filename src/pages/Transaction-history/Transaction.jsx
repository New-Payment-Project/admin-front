import React, { useState } from "react";
import PageHeader from "../../components/Page-header/PageHeader";
import Table from "../../components/Table/Table";

const Transaction = () => {
  // Mini database for accounts
  const accounts = {
    account1: {
      bankName: "Chase",
      accountType: "Chase Growth Savings Account",
      accountNumber: "●●●● ●●●● ●●●● 9999",
      balance: "$41,382.80",
      transactions: [
        { transaction: "001", amount: "-$500", status: "Processing", date: "2024-09-01", category: "Electronics" },
        { transaction: "002", amount: "+$1200", status: "Success", date: "2024-09-05", category: "Furniture" },
        { transaction: "003", amount: "-$800", status: "Declined", date: "2024-09-10", category: "Groceries" },
      ],
    },
    account2: {
      bankName: "Bank of America",
      accountType: "Premium Checking Account",
      accountNumber: "●●●● ●●●● ●●●● 8888",
      balance: "$12,564.20",
      transactions: [
        { transaction: "001", amount: "+$600", status: "Success", date: "2024-09-15", category: "Clothing" },
        { transaction: "002", amount: "-$300", status: "Processing", date: "2024-09-20", category: "Bills" },
        { transaction: "003", amount: "+$700", status: "Success", date: "2024-09-25", category: "Health" },
      ],
    },
  };

  const [selectedAccount, setSelectedAccount] = useState("account1"); // Default selected account

  // Handle account change
  const handleAccountChange = (e) => {
    setSelectedAccount(e.target.value); // Update state with the selected account
  };

  // Get the selected account data
  const currentAccount = accounts[selectedAccount];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex justify-between w-full">
        <PageHeader
          title={"Transaction history"}
          desc={"Gain Insights and Track Your Transactions Over Time"}
        />
        <div>
          <select
            className="select font-semibold select-bordered w-full max-w-xs"
            onChange={handleAccountChange}
            value={selectedAccount} // Ensure the correct account is selected
          >
            <option disabled>Select Account</option>
            <option value="account1">Account 1</option>
            <option value="account2">Account 2</option>
          </select>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-[#1570EF] w-full h-[150px] rounded-[12px] p-[24px] text-white mt-[32px] flex justify-between">
        <div className="flex flex-col justify-center my-auto h-full space-y-[10px]">
          <p className="font-bold text-[24px]">{currentAccount.bankName}</p>
          <p>{currentAccount.accountType}</p>
          <p>{currentAccount.accountNumber}</p>
        </div>
        <div className="border border-white bg-white bg-opacity-30 p-[16px] rounded-[8px]">
          <p className="font-medium text-[14px]">Current Balance</p>
          <p className="font-semibold text-[24px]">{currentAccount.balance}</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="pt-[32px] pb-[24px]">
        <Table transactions={currentAccount.transactions} />
      </div>
    </div>
  );
};

export default Transaction;
