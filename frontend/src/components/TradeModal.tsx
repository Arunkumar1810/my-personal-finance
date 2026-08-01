import React, { useState } from 'react';
import { useFallback } from './FallbackContext';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: any) => void;
  symbol: string;
}

export const TradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose, onSubmit, symbol }) => {
  const { isFallback } = useFallback();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFallback) {
      alert("Submission blocked: Live market data is unavailable.");
      return;
    }
    onSubmit({ symbol, quantity });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-96 shadow-lg border border-gray-700">
        <h2 className="text-xl font-bold mb-4">Trade {symbol}</h2>
        
        {isFallback && (
          <div className="bg-red-900 text-red-100 p-3 rounded mb-4 text-sm font-medium">
            ⚠ Trading is disabled during live data outages.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              disabled={isFallback}
              className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              min="1"
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isFallback}
              className={`px-4 py-2 font-medium rounded transition-colors ${
                isFallback 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Submit Trade
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
