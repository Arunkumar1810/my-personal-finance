export function IndianEtfsHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian ETFs - Holdings</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add Transaction
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Ticker</th>
              <th className="py-4 px-6 font-medium text-right">Shares</th>
              <th className="py-4 px-6 font-medium text-right">Avg Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Value</th>
              <th className="py-4 px-6 font-medium text-right">P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">NIFTYBEES</td>
              <td className="py-4 px-6 text-right">2,500</td>
              <td className="py-4 px-6 text-right text-gray-400">₹240.00</td>
              <td className="py-4 px-6 text-right text-white">₹262.50</td>
              <td className="py-4 px-6 text-right text-white">₹6,56,250</td>
              <td className="py-4 px-6 text-right text-green-400">+₹56,250 (+9.3%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">BANKBEES</td>
              <td className="py-4 px-6 text-right">800</td>
              <td className="py-4 px-6 text-right text-gray-400">₹510.00</td>
              <td className="py-4 px-6 text-right text-white">₹545.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,36,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹28,000 (+6.8%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">ITBEES</td>
              <td className="py-4 px-6 text-right">3,000</td>
              <td className="py-4 px-6 text-right text-gray-400">₹38.50</td>
              <td className="py-4 px-6 text-right text-white">₹41.20</td>
              <td className="py-4 px-6 text-right text-white">₹1,23,600</td>
              <td className="py-4 px-6 text-right text-green-400">+₹8,100 (+7.0%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">MON100</td>
              <td className="py-4 px-6 text-right">1,200</td>
              <td className="py-4 px-6 text-right text-gray-400">₹145.00</td>
              <td className="py-4 px-6 text-right text-white">₹168.00</td>
              <td className="py-4 px-6 text-right text-white">₹2,01,600</td>
              <td className="py-4 px-6 text-right text-green-400">+₹27,600 (+15.8%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
