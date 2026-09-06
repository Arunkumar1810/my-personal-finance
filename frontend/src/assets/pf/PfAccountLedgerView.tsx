export function PfAccountLedgerView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Provident Fund (EPF/PPF) - Ledger</h2>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm">Total PF Balance</h3>
          <div className="text-3xl font-mono mt-2 text-white font-bold">₹18,50,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm">Interest Earned (YTD)</h3>
          <div className="text-3xl font-mono mt-2 text-green-400 font-bold">+₹1,24,000</div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl">
          <h3 className="text-gray-400 text-sm">Est. Rate</h3>
          <div className="text-3xl font-mono mt-2 text-sky-400 font-bold">8.15%</div>
        </div>
      </div>

      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Month</th>
              <th className="py-4 px-6 font-medium text-right">Employee Share</th>
              <th className="py-4 px-6 font-medium text-right">Employer Share</th>
              <th className="py-4 px-6 font-medium text-right">Total Deposit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">July 2026</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-green-400">₹30,000</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 text-white font-sans">June 2026</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-gray-300">₹15,000</td>
              <td className="py-4 px-6 text-right text-green-400">₹30,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
