export function FixedDepositsMaturedView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Fixed Deposits - Matured</h2>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Bank</th>
              <th className="py-4 px-6 font-medium">Maturity Date</th>
              <th className="py-4 px-6 font-medium text-right">Principal</th>
              <th className="py-4 px-6 font-medium text-right">Interest</th>
              <th className="py-4 px-6 font-medium text-right">Total Payout</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm opacity-80">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">HDFC Bank</td>
              <td className="py-4 px-6 text-gray-400 font-sans">2025-12-01</td>
              <td className="py-4 px-6 text-right text-gray-300">₹1,00,000</td>
              <td className="py-4 px-6 text-right text-green-400">+₹14,000</td>
              <td className="py-4 px-6 text-right text-white">₹1,14,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 7. Indian Bonds & SGBs Views
