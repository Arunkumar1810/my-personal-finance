export function PfAccountAnalyticsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">PF Account - Analytics</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm mb-4 font-medium">Contribution Growth (6 Months)</h3>
          <div className="h-48 relative overflow-hidden flex items-end justify-between px-2 gap-3">
            <div className="w-10 bg-sky-500/20 h-1/6 rounded-t hover:bg-sky-500/40 transition-colors" title="Month 1" />
            <div className="w-10 bg-sky-500/30 h-2/6 rounded-t hover:bg-sky-500/40 transition-colors" title="Month 2" />
            <div className="w-10 bg-sky-500/40 h-3/6 rounded-t hover:bg-sky-500/50 transition-colors" title="Month 3" />
            <div className="w-10 bg-sky-500/50 h-4/6 rounded-t hover:bg-sky-500/60 transition-colors" title="Month 4" />
            <div className="w-10 bg-sky-500/60 h-5/6 rounded-t hover:bg-sky-500/70 transition-colors" title="Month 5" />
            <div className="w-10 bg-sky-500 h-full rounded-t hover:bg-sky-400 transition-colors" title="Month 6" />
          </div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-mono text-white mb-2 font-bold">8.15%</div>
            <div className="text-sm text-gray-500 uppercase tracking-widest font-mono">Current EPF Interest Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. Broker Sync View
