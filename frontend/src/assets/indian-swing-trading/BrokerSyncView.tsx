import { useState } from 'react';

export function BrokerSyncView() {
  const [connecting, setConnecting] = useState(false);

  const handleKiteLogin = async () => {
    setConnecting(true);
    try {
      const res = await fetch('http://localhost:8000/api/auth/login-url');
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
          return;
        }
      }
    } catch (e) {
      console.error("Broker login redirect failed", e);
    }
    setConnecting(false);
  };

  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Broker Sync (Zerodha Kite)</h2>
      </header>
      <div className="bg-[#16161D] border border-[#2C2C35] p-8 rounded-2xl max-w-xl">
        <h3 className="text-lg font-semibold text-white mb-2">Connect to Zerodha Kite</h3>
        <p className="text-gray-400 text-sm mb-6">
          Synchronize your positions, orders, holdings, and daily ticks directly from your broker.
        </p>
        <button
          onClick={handleKiteLogin}
          disabled={connecting}
          className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-lg shadow-orange-600/20"
        >
          {connecting ? 'Redirecting to Kite...' : 'Login with Kite Connect'}
        </button>
      </div>
    </div>
  );
}
