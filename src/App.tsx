import React, { useState } from 'react';
import { BankSystem } from './BankSystem';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import AIAdvisor from './components/AIAdvisor';
import BlockchainVerification from './components/BlockchainVerification';

const bankSystem = new BankSystem();

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Advanced Banking Management System</h1>
      </header>
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-4">
          <li>
            <button
              className={`text-white ${activeTab === 'dashboard' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={`text-white ${activeTab === 'history' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Transaction History
            </button>
          </li>
          <li>
            <button
              className={`text-white ${activeTab === 'advisor' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('advisor')}
            >
              AI Financial Advisor
            </button>
          </li>
          <li>
            <button
              className={`text-white ${activeTab === 'blockchain' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('blockchain')}
            >
              Blockchain Verification
            </button>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto mt-8 p-4">
        {activeTab === 'dashboard' && <Dashboard bankSystem={bankSystem} />}
        {activeTab === 'history' && <TransactionHistory bankSystem={bankSystem} />}
        {activeTab === 'advisor' && <AIAdvisor bankSystem={bankSystem} />}
        {activeTab === 'blockchain' && <BlockchainVerification bankSystem={bankSystem} />}
      </main>
    </div>
  );
}

export default App;