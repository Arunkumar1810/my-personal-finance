export function IndianLtStocksValuationView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian Long-Term Stocks - Valuation</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Portfolio Value</h3>
          <div className="text-3xl font-mono text-white font-bold">₹28,40,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Invested Value</h3>
          <div className="text-3xl font-mono text-gray-300 font-bold">₹20,00,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl border-l-4 border-l-green-500">
          <h3 className="text-gray-400 text-sm mb-2">XIRR</h3>
          <div className="text-3xl font-mono text-green-400 font-bold">22.5%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl relative overflow-hidden flex flex-col h-72">
          <h3 className="text-white font-semibold mb-1">Future Projection (10 Years)</h3>
          <p className="text-xs text-gray-500 mb-4">Based on historical 15% CAGR</p>
          <div className="flex-1 relative w-full mt-2">
            <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,80 L0,100 L100,100 L100,50 Z" fill="#4b5563" opacity="0.5" />
              <path d="M0,80 L100,50" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4" />
              <path d="M0,80 L0,100 L100,100 L100,10 Z" fill="#0ea5e9" opacity="0.3" />
              <path d="M0,80 Q50,60 100,10" fill="none" stroke="#38bdf8" strokeWidth="3" />
            </svg>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex flex-col items-center justify-center h-72">
          <h3 className="text-white font-semibold mb-4 w-full text-left">Composition</h3>
          <div
            className="relative w-28 h-28 rounded-full mb-4"
            style={{
              background: 'conic-gradient(#0ea5e9 0% 30%, #f59e0b 30% 55%, #10b981 55% 75%, #8b5cf6 75% 100%)',
              boxShadow: 'inset 0 0 15px #16161D'
            }}
          >
            <div className="absolute inset-3 bg-[#16161D] rounded-full flex items-center justify-center">
              <span className="text-[11px] text-gray-400 font-mono">4 Stocks</span>
            </div>
          </div>
          <div className="w-full space-y-1 text-xs font-mono">
            <div className="flex justify-between text-sky-400"><span>RELIANCE</span><span>30%</span></div>
            <div className="flex justify-between text-amber-400"><span>TCS</span><span>25%</span></div>
            <div className="flex justify-between text-emerald-400"><span>INFY</span><span>20%</span></div>
            <div className="flex justify-between text-violet-400"><span>HDFCBANK</span><span>25%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. US Stocks & ETFs Views
