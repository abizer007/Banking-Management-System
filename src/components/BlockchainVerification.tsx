import React, { useState } from 'react';
import { BankSystem } from '../BankSystem';

interface BlockchainVerificationProps {
  bankSystem: BankSystem;
}

const BlockchainVerification: React.FC<BlockchainVerificationProps> = ({ bankSystem }) => {
  const [transactionId, setTransactionId] = useState('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  const verifyTransaction = () => {
    // This is a simplified blockchain verification process.
    // In a real-world scenario, you'd interact with an actual blockchain network.
    const allTransactions = bankSystem.getGlobalTransactionHistory();
    const transaction = allTransactions.find(t => t.id === transactionId);

    if (transaction) {
      // Simulate blockchain verification
      const isVerified = Math.random() > 0.1; // 90% chance of verification success
      if (isVerified) {
        setVerificationResult(`Transaction ${transactionId} has been verified on the blockchain.`);
      } else {
        setVerificationResult(`Transaction ${transactionId} could not be verified. Please try again later.`);
      }
    } else {
      setVerificationResult(`Transaction ${transactionId} not found.`);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Blockchain Transaction Verification</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transactionId">
          Transaction ID
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="transactionId"
          type="text"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={verifyTransaction}
      >
        Verify Transaction
      </button>
      {verificationResult && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-bold mb-2">Verification Result</h3>
          <p>{verificationResult}</p>
        </div>
      )}
    </div>
  );
};

export default BlockchainVerification;