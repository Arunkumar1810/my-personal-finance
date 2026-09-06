export function UsStocksHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">US Stocks & ETFs - Holdings</h2>
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
              <td className="py-4 px-6 font-sans font-medium text-white">AAPL</td>
              <td className="py-4 px-6 text-right">50</td>
              <td className="py-4 px-6 text-right text-gray-400">$175.00</td>
              <td className="py-4 px-6 text-right text-white">$220.50</td>
              <td className="py-4 px-6 text-right text-white">$11,025.00</td>
              <td className="py-4 px-6 text-right text-green-400">+$2,275.00 (+26.0%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">MSFT</td>
              <td className="py-4 px-6 text-right">30</td>
              <td className="py-4 px-6 text-right text-gray-400">$340.00</td>
              <td className="py-4 px-6 text-right text-white">$415.00</td>
              <td className="py-4 px-6 text-right text-white">$12,450.00</td>
              <td className="py-4 px-6 text-right text-green-400">+$2,250.00 (+22.1%)</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">NVDA</td>
              <td className="py-4 px-6 text-right">80</td>
              <td className="py-4 px-6 text-right text-gray-400">$95.00</td>
              <td className="py-4 px-6 text-right text-white">$125.00</td>
              <td className="py-4 px-6 text-right text-white">$10,000.00</td>
              <td className="py-4 px-6 text-right text-green-400">+$2,400.00 (+31.6%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
