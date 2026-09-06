export function IndianLtStocksHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian Long-Term Stocks - Holdings</h2>
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
              <td className="py-4 px-6 font-sans font-medium text-white">RELIANCE</td>
              <td className="py-4 px-6 text-right">150</td>
              <td className="py-4 px-6 text-right text-gray-400">₹2,450.00</td>
              <td className="py-4 px-6 text-right text-white">₹2,950.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,42,500</td>
              <td className="py-4 px-6 text-right text-green-400">+₹75,000 (+20.4%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">TCS</td>
              <td className="py-4 px-6 text-right">80</td>
              <td className="py-4 px-6 text-right text-gray-400">₹3,400.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,120.00</td>
              <td className="py-4 px-6 text-right text-white">₹3,29,600</td>
              <td className="py-4 px-6 text-right text-green-400">+₹57,600 (+21.1%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">INFY</td>
              <td className="py-4 px-6 text-right">200</td>
              <td className="py-4 px-6 text-right text-gray-400">₹1,420.00</td>
              <td className="py-4 px-6 text-right text-white">₹1,780.00</td>
              <td className="py-4 px-6 text-right text-white">₹3,56,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹72,000 (+25.3%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">HDFCBANK</td>
              <td className="py-4 px-6 text-right">250</td>
              <td className="py-4 px-6 text-right text-gray-400">₹1,510.00</td>
              <td className="py-4 px-6 text-right text-white">₹1,620.00</td>
              <td className="py-4 px-6 text-right text-white">₹4,05,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹27,500 (+7.3%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
