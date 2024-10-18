import React, { useState } from 'react';
import { BankSystem } from '../BankSystem';

interface TransactionHistoryProps {
  bankSystem: BankSystem;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ bankSystem }) => {
  const [accountId, setAccountId] = useState('');
  const [transactions, setTransactions] = useState<any[]>([]);

  const handleFetchTransactions = () => {
    if (accountId) {
      const history = bankSystem.getTransactionHistory(accountId);
      setTransactions(history);
    } else {
      const globalHistory = bankSystem.getGlobalTransactionHistory();
      setTransactions(globalHistory);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountId">
          Account ID (leave blank for global history)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="accountId"
          type="text"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleFetchTransactions}
      >
        Fetch Transactions
      </button>
      {transactions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">
            {accountId ? `Transactions for Account ${accountId}` : 'Global Transaction History'}
          </h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.id}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{transaction.type}</td>
                  <td className="py-2 px-4 border-b border-gray-200">${transaction.amount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(transaction.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;