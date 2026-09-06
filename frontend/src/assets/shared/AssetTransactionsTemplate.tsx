import { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import type { AssetTransaction } from '../../types/asset-evaluation';
import { calculateXirr, buildCashflowSeries } from '../../services/xirrCalculator';

interface AssetTransactionsTemplateProps {
  assetTitle: string;
  currentValuation: number;
  evaluationRoute: string;
  holdingsRoute?: string;
  transactions: AssetTransaction[];
  onAddTransaction?: (tx: Omit<AssetTransaction, 'id'>) => void;
}

export function AssetTransactionsTemplate({
  assetTitle,
  currentValuation,
  evaluationRoute,
  holdingsRoute,
  transactions,
}: AssetTransactionsTemplateProps) {
  const [filterType, setFilterType] = useState<'ALL' | 'DEBIT' | 'CREDIT'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const formatINR = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  // Compute dynamic XIRR from current transactions and current valuation
  const xirrResult = useMemo(() => {
    const series = buildCashflowSeries(transactions, currentValuation);
    return calculateXirr(series);
  }, [transactions, currentValuation]);

  // Aggregate summary totals
  const summary = useMemo(() => {
    let totalDebits = 0;
    let totalCredits = 0;
    for (const tx of transactions) {
      if (tx.status !== 'completed') continue;
      if (tx.type === 'DEBIT') {
        totalDebits += Math.abs(tx.netCashflow);
      } else {
        totalCredits += tx.netCashflow;
      }
    }
    const netCapital = totalDebits - totalCredits;
    return {
      totalDebits,
      totalCredits,
      netCapital: Math.max(0, netCapital),
    };
  }, [transactions]);

  // Filtered transactions list
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType = filterType === 'ALL' || tx.type === filterType;
      const matchesQuery =
        searchQuery === '' ||
        tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.date.includes(searchQuery);
      return matchesType && matchesQuery;
    });
  }, [transactions, filterType, searchQuery]);

  return (
    <div className="max-w-6xl space-y-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {assetTitle}
            </h2>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              Transactions & Cashflows
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Historical capital movements powering dynamic XIRR calculation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to={evaluationRoute}
            className="bg-[#2C2C35] hover:bg-[#383844] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>← Asset Evaluation</span>
          </NavLink>

          {holdingsRoute && (
            <NavLink
              to={holdingsRoute}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Holdings
            </NavLink>
          )}
        </div>
      </header>

      {/* Financial Valuation & Cashflow Summary Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Valuation */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Current Account Valuation
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {formatINR(currentValuation)}
          </div>
          <div className="text-xs text-sky-400 mt-2 font-medium">
            Terminal Value for XIRR
          </div>
        </div>

        {/* Total Inflows (Credits) */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Realized Inflows (Credits)
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            +{formatINR(summary.totalCredits)}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Dividends, Sales & Interest
          </div>
        </div>

        {/* Total Outflows (Debits) */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Capital Deployed (Debits)
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400 mt-1">
            -{formatINR(summary.totalDebits)}
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Purchases, SIPs & Deposits
          </div>
        </div>

        {/* Dynamic Computed XIRR */}
        <div className="bg-[#16161D] border border-[#2C2C35] p-5 rounded-2xl relative overflow-hidden">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex justify-between">
            <span>Dynamic XIRR</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
              Live
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
            {xirrResult.formatted}
          </div>
          <div className="text-xs text-gray-400 mt-2 truncate" title={xirrResult.notes || 'Calculated from cashflows'}>
            {xirrResult.notes || `Derived from ${transactions.length} transactions`}
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Ledger Table */}
      <div className="bg-[#16161D] border border-[#2C2C35] rounded-2xl overflow-hidden shadow-lg">
        <div className="p-4 border-b border-[#2C2C35] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-[#191924]">
          {/* Type Tabs */}
          <div className="flex gap-1.5 bg-[#14141E] p-1 rounded-lg border border-[#2C2C35]">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                filterType === 'ALL' ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              All ({transactions.length})
            </button>
            <button
              onClick={() => setFilterType('DEBIT')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                filterType === 'DEBIT' ? 'bg-rose-500/20 text-rose-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Debits / Outflows
            </button>
            <button
              onClick={() => setFilterType('CREDIT')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                filterType === 'CREDIT' ? 'bg-emerald-500/20 text-emerald-300' : 'text-gray-400 hover:text-white'
              }`}
            >
              Credits / Inflows
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search description or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#14141E] border border-[#2C2C35] text-xs text-white placeholder-gray-500 px-3 py-2 rounded-lg outline-none focus:border-sky-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#2C2C35]/30">
              <tr className="text-gray-400 text-xs uppercase tracking-wider border-b border-[#2C2C35]">
                <th className="py-3.5 px-6 font-medium">Date</th>
                <th className="py-3.5 px-6 font-medium">Type</th>
                <th className="py-3.5 px-6 font-medium">Description</th>
                <th className="py-3.5 px-6 font-medium text-right">Units</th>
                <th className="py-3.5 px-6 font-medium text-right">Unit Price</th>
                <th className="py-3.5 px-6 font-medium text-right">Charges</th>
                <th className="py-3.5 px-6 font-medium text-right">Net Cashflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C2C35] font-mono text-sm">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-sans text-sm">
                    No transactions found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#2C2C35]/20 transition-colors">
                    <td className="py-3.5 px-6 text-gray-300 whitespace-nowrap">{tx.date}</td>
                    <td className="py-3.5 px-6 whitespace-nowrap">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          tx.type === 'DEBIT'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-sans text-white font-medium">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-6 text-right text-gray-400">
                      {tx.units !== undefined ? tx.units : '—'}
                    </td>
                    <td className="py-3.5 px-6 text-right text-gray-400">
                      {tx.unitPrice !== undefined ? formatINR(tx.unitPrice) : '—'}
                    </td>
                    <td className="py-3.5 px-6 text-right text-gray-500 text-xs">
                      {tx.charges ? formatINR(tx.charges) : '₹0'}
                    </td>
                    <td
                      className={`py-3.5 px-6 text-right font-bold whitespace-nowrap ${
                        tx.netCashflow >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {tx.netCashflow >= 0 ? '+' : ''}
                      {formatINR(tx.netCashflow)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
