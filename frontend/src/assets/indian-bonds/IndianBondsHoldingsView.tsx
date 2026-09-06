export function IndianBondsHoldingsView() {
  return (
    <div className="max-w-5xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Indian Bonds & SGBs - Holdings</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          + Add Bond
        </button>
      </header>
      <div className="border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg bg-[#16161D]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#2C2C35]/30">
            <tr className="text-gray-400 text-sm border-b border-[#2C2C35]">
              <th className="py-4 px-6 font-medium">Bond / SGB Name</th>
              <th className="py-4 px-6 font-medium text-right">Units</th>
              <th className="py-4 px-6 font-medium text-right">Issue Price</th>
              <th className="py-4 px-6 font-medium text-right">Current Price</th>
              <th className="py-4 px-6 font-medium text-right">Coupon Rate</th>
              <th className="py-4 px-6 font-medium text-right">Current Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">SGB 2029 Series IV</td>
              <td className="py-4 px-6 text-right">50</td>
              <td className="py-4 px-6 text-right text-gray-400">₹4,800</td>
              <td className="py-4 px-6 text-right text-white">₹7,150</td>
              <td className="py-4 px-6 text-right text-amber-400">2.5% p.a.</td>
              <td className="py-4 px-6 text-right text-green-400">₹3,57,500</td>
            </tr>
            <tr className="hover:bg-[#2C2C35]/20 transition-colors">
              <td className="py-4 px-6 font-sans font-medium text-white">NHAI Tax-Free Bonds</td>
              <td className="py-4 px-6 text-right">100</td>
              <td className="py-4 px-6 text-right text-gray-400">₹1,000</td>
              <td className="py-4 px-6 text-right text-white">₹1,180</td>
              <td className="py-4 px-6 text-right text-sky-400">8.20%</td>
              <td className="py-4 px-6 text-right text-white">₹1,18,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
