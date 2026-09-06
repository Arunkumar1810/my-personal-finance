import { useEffect, useState } from 'react';
import { LiquidityRiver } from './LiquidityRiver';
import { fetchValuations, fetchLiabilities } from '../services/api';

export function NetWorthDashboard() {
  const [assetsTotal, setAssetsTotal] = useState<number>(400050);
  const [liabilitiesTotal, setLiabilitiesTotal] = useState<number>(58000);
  const liquidCash = 24500;

  useEffect(() => {
    Promise.all([fetchValuations(), fetchLiabilities()])
      .then(([valData, libData]) => {
        if (valData?.assets && valData.assets.length > 0) {
          const sumAssets = valData.assets.reduce((acc: number, a: any) => acc + (a.current_value || 0), 0);
          if (sumAssets > 0) setAssetsTotal(sumAssets);
        }
        if (libData?.liabilities && libData.liabilities.length > 0) {
          const sumLibs = libData.liabilities.reduce((acc: number, l: any) => acc + (l.total_amount || 0), 0);
          if (sumLibs > 0) setLiabilitiesTotal(sumLibs);
        }
      })
      .catch(err => console.error("Error loading dashboard figures:", err));
  }, []);

  const netWorth = assetsTotal - liabilitiesTotal;

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Net Worth Overview</h2>
          <p className="text-gray-400 text-sm mt-1">Inspired by Maybe Finance & Actual</p>
        </div>
        <div className="text-left md:text-right">
          <div className="text-3xl font-mono font-bold text-white">
            ${netWorth.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-sm font-mono text-green-400">+$2,400.00 (Last 30 Days)</div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl shadow-sm hover:border-[#38bdf8]/40 transition-colors">
          <h3 className="text-gray-400 text-sm mb-2 font-medium">Assets</h3>
          <div className="text-2xl font-mono text-white font-semibold">
            ${assetsTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl shadow-sm hover:border-rose-500/40 transition-colors">
          <h3 className="text-gray-400 text-sm mb-2 font-medium">Liabilities</h3>
          <div className="text-2xl font-mono text-rose-400 font-semibold">
            -${liabilitiesTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl shadow-sm hover:border-sky-500/40 transition-colors">
          <h3 className="text-gray-400 text-sm mb-2 font-medium">Liquid Cash</h3>
          <div className="text-2xl font-mono text-sky-400 font-semibold">
            ${liquidCash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <LiquidityRiver />
    </div>
  );
}
