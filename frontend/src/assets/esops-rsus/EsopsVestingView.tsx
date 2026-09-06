export function EsopsVestingView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">ESOPs & RSUs - Vesting Schedule</h2>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Vested (Available)</h3>
          <div className="text-3xl font-mono text-green-400 font-bold">2,500 Shares</div>
          <div className="text-sm font-mono text-gray-400 mt-1">Est. Value: $375,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-2">Unvested</h3>
          <div className="text-3xl font-mono text-amber-400 font-bold">7,500 Shares</div>
          <div className="text-sm font-mono text-gray-400 mt-1">Est. Value: $1,125,000</div>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-4 text-white">Upcoming Vesting Tranches</h3>
      <div className="space-y-4">
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl flex justify-between items-center">
          <div>
            <div className="font-semibold text-white">Tranche 2 (25%)</div>
            <div className="text-xs text-gray-400">Vests on Oct 1, 2026</div>
          </div>
          <div className="font-mono text-white text-right">
            <div>2,500 Shares</div>
            <div className="text-xs text-gray-500">$375,000</div>
          </div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-4 rounded-xl flex justify-between items-center">
          <div>
            <div className="font-semibold text-white">Tranche 3 (25%)</div>
            <div className="text-xs text-gray-400">Vests on Oct 1, 2027</div>
          </div>
          <div className="font-mono text-white text-right">
            <div>2,500 Shares</div>
            <div className="text-xs text-gray-500">$375,000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
