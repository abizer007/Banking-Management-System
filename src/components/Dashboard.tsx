import React, { useState } from 'react';
import { BankSystem } from '../BankSystem';

interface DashboardProps {
  bankSystem: BankSystem;
}

const Dashboard: React.FC<DashboardProps> = ({ bankSystem }) => {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState('');

  const handleCreateAccount = () => {
    if (accountId) {
      bankSystem.createAccount(accountId);
      setMessage(`Account ${accountId} created successfully.`);
    }
  };

  const handleDeposit = () => {
    if (accountId && amount) {
      bankSystem.deposit(accountId, parseFloat(amount));
      setMessage(`Deposited ${amount} to account ${accountId}.`);
      setBalance(bankSystem.getBalance(accountId));
    }
  };

  const handleWithdraw = () => {
    if (accountId && amount) {
      const success = bankSystem.withdraw(accountId, parseFloat(amount));
      if (success) {
        setMessage(`Withdrawn ${amount} from account ${accountId}.`);
        setBalance(bankSystem.getBalance(accountId));
      } else {
        setMessage('Insufficient funds or account not found.');
      }
    }
  };

  const handleCheckBalance = () => {
    if (accountId) {
      const balance = bankSystem.getBalance(accountId);
      if (balance !== undefined) {
        setBalance(balance);
        setMessage(`Current balance for account ${accountId}: ${balance}`);
      } else {
        setMessage('Account not found.');
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountId">
          Account ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="accountId"
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
          Amount
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/4 px-2 mb-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleCreateAccount}
          >
            Create Account
          </button>
        </div>
        <div className="w-full md:w-1/4 px-2 mb-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleDeposit}
          >
            Deposit
          </button>
        </div>
        <div className="w-full md:w-1/4 px-2 mb-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleWithdraw}
          >
            Withdraw
          </button>
        </div>
        <div className="w-full md:w-1/4 px-2 mb-2">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            onClick={handleCheckBalance}
          >
            Check Balance
          </button>
        </div>
      </div>
      {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
          <p>{message}</p>
        </div>
      )}
      {balance !== undefined && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p>Current Balance: ${balance.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;