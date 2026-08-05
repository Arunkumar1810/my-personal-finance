import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function Settings() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<string | null>(null);

  useEffect(() => {
    const auth = searchParams.get('auth');
    if (auth === 'success') {
      setAuthStatus('Successfully authenticated with Kite! Your session is now active.');
    } else if (auth === 'error') {
      setError('Failed to authenticate with Kite. Please try again.');
    }
  }, [searchParams]);

  const handleKiteConnect = async () => {
    try {
      setLoading(true);
      setError(null);
      // Assuming Vite proxy is set up or monolith is on :8000
      const response = await fetch('http://localhost:8000/api/auth/login-url');
      if (!response.ok) {
        let errMsg = 'Failed to fetch login URL';
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errMsg = errData.detail;
          }
        } catch (e) {
          // Ignore parsing errors
        }
        throw new Error(errMsg);
      }
      const data = await response.json();
      if (data.url) {
        // Redirect browser to Kite OAuth
        window.location.href = data.url;
      } else {
        throw new Error('No URL returned from backend');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Settings</h2>

      <div className="bg-[#16161D] rounded-xl border border-[#2C2C35] overflow-hidden">
        <div className="p-6 border-b border-[#2C2C35]">
          <h3 className="text-xl font-semibold mb-2">Broker Integrations</h3>
          <p className="text-gray-400">Connect your trading accounts to sync positions and orders.</p>
        </div>

        <div className="p-6 space-y-6">
          {authStatus && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-lg flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{authStatus}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg flex items-start">
              <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-white">Zerodha Kite</h4>
              <p className="text-sm text-gray-400 mt-1">Authenticate to fetch real-time holdings and active GTTs.</p>
            </div>
            <button
              onClick={handleKiteConnect}
              disabled={loading}
              className="px-6 py-2.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-[#FF5722]/20"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Connecting...
                </>
              ) : (
                'Kite Connect'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
