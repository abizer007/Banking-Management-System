import React, { useState } from 'react';
import { BankSystem } from '../BankSystem';

interface AIAdvisorProps {
  bankSystem: BankSystem;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ bankSystem }) => {
  const [accountId, setAccountId] = useState('');
  const [advice, setAdvice] = useState('');

  const generateAdvice = () => {
    if (!accountId) {
      setAdvice('Please enter an account ID.');
      return;
    }

    const balance = bankSystem.getBalance(accountId);
    if (balance === undefined) {
      setAdvice('Account not found. Please check the account ID and try again.');
      return;
    }

    const transactions = bankSystem.getTransactionHistory(accountId);
    const network = bankSystem.getCustomerNetwork(accountId);

    // This is a simplified AI advisor. In a real-world scenario, you'd use more sophisticated algorithms and machine learning models.
    let advisoryText = `Based on your current balance of $${balance.toFixed(2)} and transaction history, here's some financial advice:\n\n`;

    if (balance < 1000) {
      advisoryText += "- Your balance is relatively low. Consider setting up a savings plan to build an emergency fund.\n";
    } else if (balance > 10000) {
      advisoryText += "- You have a healthy balance. Consider exploring investment options to make your money work for you.\n";
    }

    const deposits = transactions.filter(t => t.type === 'deposit');
    const withdrawals = transactions.filter(t => t.type === 'withdrawal');

    if (withdrawals.length > deposits.length * 2) {
      advisoryText += "- You seem to be withdrawing money more frequently than depositing. Try to balance your income and expenses.\n";
    }

    if (network.length > 5) {
      advisoryText += "- You have a large network of connections. Consider exploring group savings or investment opportunities with your trusted contacts.\n";
    }

    advisoryText += "\nRemember, this is general advice. For personalized financial planning, please consult with a professional financial advisor.";

    setAdvice(advisoryText);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">AI Financial Advisor</h2>
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={generateAdvice}
      >
        Get AI Advice
      </button>
      {advice && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">Financial Advice</h3>
          <pre className="whitespace-pre-wrap">{advice}</pre>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;