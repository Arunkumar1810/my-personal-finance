import React, { useEffect, useState } from 'react';
import { fetchLiabilities, saveLiability } from '../../services/api';

export interface Liability {
  id: string;
  name: string;
  total_amount: number;
  apr: number;
  monthly_emi: number;
  next_due_date?: string;
  autopay_enabled?: boolean;
}

const defaultLiabilities: Liability[] = [
  {
    id: 'L1',
    name: 'Home Mortgage',
    total_amount: 350000,
    apr: 8.5,
    monthly_emi: 1200,
    next_due_date: '2026-08-27',
    autopay_enabled: false
  },
  {
    id: 'L2',
    name: 'Platinum Credit Card',
    total_amount: 5000,
    apr: 24.0,
    monthly_emi: 1250,
    next_due_date: '2026-09-01',
    autopay_enabled: true
  }
];

export function LiabilitiesPage() {
  const [liabilities, setLiabilities] = useState<Liability[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formApr, setFormApr] = useState('');
  const [formEmi, setFormEmi] = useState('');
  const [formDueDate, setFormDueDate] = useState('');
  const [formAutopay, setFormAutopay] = useState(false);


  const loadLiabilities = React.useCallback(async () => {
    try {
      const data = await fetchLiabilities();
      if (data?.liabilities && data.liabilities.length > 0) {
        setLiabilities(data.liabilities);
      } else {
        setLiabilities(defaultLiabilities);
      }
    } catch (e) {
      console.error('Error fetching liabilities:', e);
      setLiabilities(defaultLiabilities);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLiabilities();
  }, [loadLiabilities]);


  const openAddModal = () => {
    setEditingId(null);
    setFormName('');
    setFormAmount('');
    setFormApr('');
    setFormEmi('');
    setFormDueDate('');
    setFormAutopay(false);
    setIsModalOpen(true);
  };

  const openEditModal = (lib: Liability) => {
    setEditingId(lib.id);
    setFormName(lib.name);
    setFormAmount(lib.total_amount.toString());
    setFormApr(lib.apr.toString());
    setFormEmi(lib.monthly_emi.toString());
    setFormDueDate(lib.next_due_date || '');
    setFormAutopay(Boolean(lib.autopay_enabled));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingId || undefined,
      name: formName || 'Personal Liability',
      total_amount: parseFloat(formAmount) || 0,
      apr: parseFloat(formApr) || 0,
      monthly_emi: parseFloat(formEmi) || 0,
      next_due_date: formDueDate || undefined,
      autopay_enabled: formAutopay
    };

    try {
      await saveLiability(payload);
      await loadLiabilities();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save liability', err);
      // Optimistic local update
      if (editingId) {
        setLiabilities(liabilities.map(l => l.id === editingId ? { ...l, ...payload, id: editingId } : l));
      } else {
        setLiabilities([...liabilities, { ...payload, id: `L_${Date.now()}` }]);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Liabilities & Debt</h2>
          <p className="text-gray-400 text-sm mt-1">Manage and track your active debts.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-md shadow-blue-600/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Liability
        </button>
      </header>

      {loading ? (
        <div className="text-gray-400 font-mono">Loading liabilities...</div>
      ) : (
        <div className="space-y-4">
          {liabilities.map((l) => {
            const isCard = l.name.toLowerCase().includes('card');
            const progressPercent = isCard ? 25 : 35;
            const paidAmount = Math.round((l.total_amount * progressPercent) / 100);
            const remainingAmount = l.total_amount - paidAmount;

            return (
              <div
                key={l.id}
                className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between relative group hover:border-[#2C2C35]/80 transition-colors gap-6"
              >
                <div className="flex-1 w-full">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{l.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs border ${
                      isCard 
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' 
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}>
                      {l.apr}% APR
                    </span>
                  </div>
                  <div className="w-full md:w-3/4 h-2 bg-[#2C2C35] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${isCard ? 'bg-rose-500' : 'bg-blue-500'}`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between w-full md:w-3/4 mt-2 text-sm text-gray-400 font-mono">
                    <span>${paidAmount.toLocaleString()} {isCard ? 'Used' : 'Paid'}</span>
                    <span>${remainingAmount.toLocaleString()} {isCard ? 'Available' : 'Remaining'}</span>
                  </div>
                </div>

                <div className="text-left md:text-right pl-0 md:pl-6 border-l-0 md:border-l border-[#2C2C35] min-w-[180px]">
                  <div className="text-xs text-gray-400 uppercase mb-1">
                    {isCard ? 'Statement Balance' : 'Next EMI'}
                  </div>
                  <div className="text-xl font-mono text-rose-400 font-semibold">
                    -${l.monthly_emi.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`text-xs mt-1 ${l.autopay_enabled ? 'text-green-400' : 'text-gray-500'}`}>
                    {l.autopay_enabled ? 'Autopay Scheduled' : (l.next_due_date ? `Due on ${l.next_due_date}` : 'Due in 4 days')}
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                  <button
                    onClick={() => openEditModal(l)}
                    className="bg-[#0D0D12] text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-[#2C2C35] text-xs transition-colors shadow-lg"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Liability Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#16161D] border border-[#2C2C35] rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingId ? 'Edit Liability' : 'Add Liability'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Liability Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Car Loan"
                  className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500 font-mono text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Total Amount ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    placeholder="25000.00"
                    className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Interest Rate (APR %)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formApr}
                    onChange={(e) => setFormApr(e.target.value)}
                    placeholder="8.5"
                    className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Monthly EMI ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formEmi}
                    onChange={(e) => setFormEmi(e.target.value)}
                    placeholder="550.00"
                    className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Next Due Date</label>
                  <input
                    type="date"
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="autopay-checkbox"
                  checked={formAutopay}
                  onChange={(e) => setFormAutopay(e.target.checked)}
                  className="rounded bg-[#0D0D12] border-[#2C2C35] text-blue-600 focus:ring-0"
                />
                <label htmlFor="autopay-checkbox" className="text-xs text-gray-300 select-none cursor-pointer">
                  Autopay Scheduled
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-[#2C2C35]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-lg"
                >
                  Save Liability
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
