import React, { useEffect, useState } from 'react';
import { fetchGoals, saveGoal } from '../services/api';

export interface Goal {
  id: string;
  name: string;
  target_amount: number;
  current_saved: number;
  target_date?: string;
  description?: string;
}

const defaultGoals: Goal[] = [
  {
    id: 'G1',
    name: 'Emergency Fund',
    target_amount: 30000,
    current_saved: 20000,
    description: 'Target: 6 Months Expenses'
  },
  {
    id: 'G2',
    name: 'Europe Vacation 2027',
    target_amount: 10000,
    current_saved: 4000,
    target_date: '2027-05-01',
    description: 'Target Date: May 2027'
  }
];

export function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formTarget, setFormTarget] = useState('');
  const [formSaved, setFormSaved] = useState('');
  const [formDate, setFormDate] = useState('');


  const loadGoals = React.useCallback(async () => {
    try {
      const data = await fetchGoals();
      if (data?.goals && data.goals.length > 0) {
        setGoals(data.goals);
      } else {
        setGoals(defaultGoals);
      }
    } catch (e) {
      console.error('Error fetching goals:', e);
      setGoals(defaultGoals);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);


  const openAddModal = () => {
    setEditingId(null);
    setFormName('');
    setFormDesc('');
    setFormTarget('');
    setFormSaved('');
    setFormDate('');
    setIsModalOpen(true);
  };

  const openEditModal = (goal: Goal) => {
    setEditingId(goal.id);
    setFormName(goal.name);
    setFormDesc(goal.description || '');
    setFormTarget(goal.target_amount.toString());
    setFormSaved(goal.current_saved.toString());
    setFormDate(goal.target_date || '');
    setIsModalOpen(true);
  };

  const handleAddFunds = async (goal: Goal) => {
    const increment = 500;
    const updated = {
      ...goal,
      current_saved: Math.min(goal.target_amount, goal.current_saved + increment)
    };
    try {
      await saveGoal(updated);
      await loadGoals();
    } catch (err) {
      console.error('Failed to add funds', err);
      setGoals(goals.map(g => g.id === goal.id ? updated : g));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editingId || undefined,
      name: formName || 'New Goal',
      target_amount: parseFloat(formTarget) || 0,
      current_saved: parseFloat(formSaved) || 0,
      target_date: formDate || undefined
    };

    try {
      await saveGoal(payload);
      await loadGoals();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save goal', err);
      if (editingId) {
        setGoals(goals.map(g => g.id === editingId ? { ...g, ...payload, id: editingId, description: formDesc } : g));
      } else {
        setGoals([...goals, { ...payload, id: `G_${Date.now()}`, description: formDesc }]);
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Financial Goals</h2>
          <p className="text-gray-400 text-sm mt-1">Envelope budgeting inspired by Actual Budget & Maybe</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-md shadow-blue-600/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Goal
        </button>
      </header>

      {loading ? (
        <div className="text-gray-400 font-mono">Loading goals...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((g) => {
            const fundedPct = g.target_amount > 0 
              ? Math.min(100, Math.round((g.current_saved / g.target_amount) * 100)) 
              : 0;
            const isFinished = fundedPct >= 100;

            return (
              <div
                key={g.id}
                className="bg-[#16161D] border border-[#2C2C35] p-6 rounded-2xl relative group hover:border-[#2C2C35]/80 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{g.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {g.description || (g.target_date ? `Target: ${g.target_date}` : 'Target Goal')}
                    </p>
                  </div>
                  <div className="text-right font-mono mt-1 text-sm">
                    <span className="text-green-400 font-semibold">${g.current_saved.toLocaleString()}</span>
                    <span className="text-gray-400"> / ${g.target_amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="w-full h-3 bg-[#2C2C35] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${isFinished ? 'bg-emerald-400' : (fundedPct > 50 ? 'bg-green-500' : 'bg-blue-500')}`}
                    style={{ width: `${fundedPct}%` }}
                  />
                </div>

                <div className="mt-4 flex justify-between text-sm items-center">
                  <span className="text-gray-400 font-mono">{fundedPct}% Funded</span>
                  <button
                    onClick={() => handleAddFunds(g)}
                    className="text-blue-400 hover:text-blue-300 font-medium text-xs transition-colors hover:underline"
                  >
                    + Add Funds ($500)
                  </button>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2 bg-[#16161D] pl-2">
                  <button
                    onClick={() => openEditModal(g)}
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

      {/* Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#16161D] border border-[#2C2C35] rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">
                {editingId ? 'Edit Goal' : 'Goal Details'}
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
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Dream House Downpayment"
                  className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="e.g. Target: 20% of home value"
                  className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Target Amount ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formTarget}
                    onChange={(e) => setFormTarget(e.target.value)}
                    placeholder="30000.00"
                    className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Current Saved ($)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={formSaved}
                    onChange={(e) => setFormSaved(e.target.value)}
                    placeholder="10000.00"
                    className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Target Date (Optional)</label>
                <input
                  type="month"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full bg-[#0D0D12] border border-[#2C2C35] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-sky-500"
                />
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
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
