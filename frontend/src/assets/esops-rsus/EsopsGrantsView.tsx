export function EsopsGrantsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">ESOPs - Grants</h2>
      </header>
      <div className="space-y-4">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Grant #2023-A</h3>
            <span className="px-3 py-1 bg-sky-500/10 text-sky-400 text-xs rounded border border-sky-500/20">
              Vesting Active
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><span className="block text-gray-500 mb-1">Grant Date</span><span className="font-mono text-white">Oct 1, 2023</span></div>
            <div><span className="block text-gray-500 mb-1">Total Options</span><span className="font-mono text-white">10,000</span></div>
            <div><span className="block text-gray-500 mb-1">Vested</span><span className="font-mono text-green-400">2,500</span></div>
            <div><span className="block text-gray-500 mb-1">Unvested</span><span className="font-mono text-white">7,500</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. Fixed Deposits Views
