// DonatePanel: interface de donation en SUI

'use client'

import { useState } from 'react';

export default function DonatePanel({ creatorAddress }: { creatorAddress: string }) {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDonate = () => {
    // TODO: Implémenter la donation avec @mysten/dapp-kit
    console.log('Donating', amount, 'SUI to', creatorAddress);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">Support the Creator</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Amount (SUI)</label>
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="0.0"
            min="0"
            step="0.1"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Message (optional)</label>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Leave a message..."
            rows={3}
          />
        </div>
        
        <button 
          onClick={handleDonate}
          disabled={!amount || parseFloat(amount) <= 0}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Send Donation
        </button>
      </div>
    </div>
  );
}
