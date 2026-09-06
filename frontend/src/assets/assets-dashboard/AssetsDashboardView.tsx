export function AssetsDashboardView() {
  return (
    <div className="max-w-5xl">
      <h2 className="text-2xl font-semibold mb-6 text-white">Assets Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm font-medium">Total Assets Value</h3>
          <div className="text-3xl font-mono mt-2 text-white font-bold">$298,500.00</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm font-medium">Asset Allocation</h3>
          <div className="mt-4 w-full h-4 rounded-full overflow-hidden flex">
            <div className="h-full bg-blue-500" style={{ width: '70%' }} title="Equity 70%" />
            <div className="h-full bg-orange-400" style={{ width: '20%' }} title="Debt 20%" />
            <div className="h-full bg-emerald-500" style={{ width: '10%' }} title="Cash 10%" />
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Equity (70%)</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-orange-400 rounded-full" /> Debt (20%)</span>
            <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-full" /> Cash (10%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
