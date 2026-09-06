export function FixedDepositsActiveView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Fixed Deposits - Active</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add FD
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Bank</th>
              <th className="py-4 px-6 font-medium text-right">Principal</th>
              <th className="py-4 px-6 font-medium text-right">Interest Rate</th>
              <th className="py-4 px-6 font-medium">Maturity Date</th>
              <th className="py-4 px-6 font-medium text-right">Accrued Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">HDFC Bank</td>
              <td className="py-4 px-6 text-right text-gray-300">₹2,00,000</td>
              <td className="py-4 px-6 text-right text-sky-400">7.25%</td>
              <td className="py-4 px-6 text-gray-400 font-sans">2027-03-15</td>
              <td className="py-4 px-6 text-right text-white">₹2,18,500</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">State Bank of India</td>
              <td className="py-4 px-6 text-right text-gray-300">₹1,50,000</td>
              <td className="py-4 px-6 text-right text-sky-400">7.00%</td>
              <td className="py-4 px-6 text-gray-400 font-sans">2026-11-20</td>
              <td className="py-4 px-6 text-right text-white">₹1,58,200</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
