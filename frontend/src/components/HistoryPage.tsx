import { useState, useEffect } from 'react';
import { CampaignJournalModal, Campaign as ModalCampaign } from './CampaignJournalModal';

interface RawExecution {
  id: number;
  ticker: string;
  side: string;
  quantity: number;
  price: number;
  timestamp: string;
}

export function HistoryPage() {
  const [activeTab, setActiveTab] = useState<'raw' | 'campaigns'>('raw');
  const [executions, setExecutions] = useState<RawExecution[]>([]);
  const [campaigns, setCampaigns] = useState<ModalCampaign[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingCampaign, setEditingCampaign] = useState<ModalCampaign | null>(null);

  const fetchExecutions = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/api/broker/executions');
      if (!res.ok) throw new Error('Failed to fetch executions');
      const data = await res.json();
      setExecutions(data.executions || []);
      
      const campRes = await fetch('http://localhost:8000/api/campaigns');
      if (campRes.ok) {
        const campData = await campRes.json();
        setCampaigns(campData.campaigns || []);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExecutions();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      const res = await fetch('http://localhost:8000/api/broker/sync', { method: 'POST' });
      if (!res.ok) {
        let errMsg = 'Sync failed';
        try {
          const errData = await res.json();
          if (errData && errData.detail) errMsg = errData.detail;
        } catch (e) { }
        throw new Error(errMsg);
      }
      await fetchExecutions();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSyncing(false);
    }
  };

  const handleSelect = (id: number) => {
    const newSel = new Set(selectedIds);
    if (newSel.has(id)) newSel.delete(id);
    else newSel.add(id);
    setSelectedIds(newSel);
  };

  const handleCreateCampaign = async () => {
    if (selectedIds.size === 0) return;
    const selectedEx = executions.filter(e => selectedIds.has(e.id));
    const ticker = selectedEx[0].ticker;
    const allSameTicker = selectedEx.every(e => e.ticker === ticker);
    if (!allSameTicker) {
      setError("All selected executions must have the same ticker to group into a campaign.");
      return;
    }
    
    try {
      setError(null);
      const res = await fetch('http://localhost:8000/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker, execution_ids: Array.from(selectedIds) })
      });
      if (!res.ok) throw new Error('Failed to create campaign');
      setSelectedIds(new Set());
      await fetchExecutions();
      setActiveTab('campaigns');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-4 items-center">
          <h2 className="text-3xl font-bold mr-4">History & Sync</h2>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'raw' ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1C1C24]'}`}
            onClick={() => setActiveTab('raw')}
          >
            Raw Executions
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'campaigns' ? 'bg-[#2C2C35] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1C1C24]'}`}
            onClick={() => setActiveTab('campaigns')}
          >
            Swing Campaigns
          </button>
        </div>
        <div className="flex space-x-3">
          {activeTab === 'raw' && selectedIds.size > 0 && (
            <button
              onClick={handleCreateCampaign}
              className="px-4 py-2 bg-[#2196F3] hover:bg-[#1E88E5] text-white font-medium rounded-lg transition-colors shadow-lg shadow-[#2196F3]/20"
            >
              Group {selectedIds.size} into Campaign
            </button>
          )}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="px-4 py-2 bg-[#FF5722] hover:bg-[#F4511E] text-white font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center shadow-lg shadow-[#FF5722]/20"
          >
            {syncing ? 'Syncing...' : 'Sync Trades'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-[#16161D] rounded-xl border border-[#2C2C35] overflow-hidden flex-1 flex flex-col">
        {activeTab === 'raw' ? (
          <>
            <div className="p-6 border-b border-[#2C2C35]">
              <h3 className="text-xl font-semibold mb-2">Raw Executions</h3>
              <p className="text-gray-400">Select unassigned trades to group them into a Swing Campaign.</p>
            </div>
            
            <div className="overflow-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#1C1C24] sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-400 w-12"></th>
                    <th className="px-6 py-3 font-medium text-gray-400">Date</th>
                    <th className="px-6 py-3 font-medium text-gray-400">Ticker</th>
                    <th className="px-6 py-3 font-medium text-gray-400">Side</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Quantity</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2C35]">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading executions...</td>
                    </tr>
                  ) : executions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No raw executions found. Click Sync Trades to fetch.</td>
                    </tr>
                  ) : (
                    executions.map(ex => (
                      <tr 
                        key={ex.id} 
                        className={`transition-colors cursor-pointer ${selectedIds.has(ex.id) ? 'bg-[#FF5722]/10 hover:bg-[#FF5722]/20' : 'hover:bg-[#1C1C24]/50'}`}
                        onClick={() => handleSelect(ex.id)}
                      >
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            checked={selectedIds.has(ex.id)} 
                            onChange={() => {}} 
                            className="w-4 h-4 rounded border-[#2C2C35] bg-[#1C1C24] text-[#FF5722] focus:ring-[#FF5722] focus:ring-offset-0"
                          />
                        </td>
                        <td className="px-6 py-4 text-gray-300">{new Date(ex.timestamp).toLocaleString()}</td>
                        <td className="px-6 py-4 font-medium text-white">{ex.ticker}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            ex.side.toUpperCase() === 'BUY' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                          }`}>
                            {ex.side.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-300">{ex.quantity}</td>
                        <td className="px-6 py-4 text-right text-gray-300">₹{ex.price.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="p-6 border-b border-[#2C2C35]">
              <h3 className="text-xl font-semibold mb-2">Swing Campaigns</h3>
              <p className="text-gray-400">Grouped executions forming complete trading campaigns.</p>
            </div>
            
            <div className="overflow-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#1C1C24] sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-400">Created</th>
                    <th className="px-6 py-3 font-medium text-gray-400">Ticker</th>
                    <th className="px-6 py-3 font-medium text-gray-400">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Avg Entry</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Avg Exit</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Realized P/L</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">R/R (Plan vs Act)</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2C35]">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">Loading campaigns...</td>
                    </tr>
                  ) : campaigns.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">No campaigns created yet. Group some raw executions!</td>
                    </tr>
                  ) : (
                    campaigns.map(camp => (
                      <tr key={camp.id} className="hover:bg-[#1C1C24]/50 transition-colors">
                        <td className="px-6 py-4 text-gray-300">
                          <div className="flex flex-col">
                            <span>{new Date(camp.created_at).toLocaleDateString()}</span>
                            {camp.emotion && <span className="text-xs text-gray-500 mt-1">{camp.emotion} (R:{camp.regret_metric})</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{camp.ticker}</div>
                          <div className="flex space-x-1 mt-1">
                            {camp.strategy && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-500/10 text-purple-400">{camp.strategy}</span>}
                            {camp.sell_reason && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-400">{camp.sell_reason}</span>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/10 text-blue-400">
                            {camp.status.toUpperCase()} ({camp.executions_count} trades)
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-300">₹{camp.entry_price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right text-gray-300">₹{camp.exit_price.toFixed(2)}</td>
                        <td className={`px-6 py-4 text-right font-medium ${camp.realized_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {camp.realized_pnl >= 0 ? '+' : ''}₹{camp.realized_pnl.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            {camp.planned_risk && camp.planned_reward ? (
                              <>
                                <span className="text-xs text-gray-400">Plan: 1:{(camp.planned_reward / camp.planned_risk).toFixed(1)}</span>
                                <span className={`text-xs font-medium ${
                                  camp.realized_pnl > 0 
                                    ? (camp.realized_pnl / camp.planned_risk) >= (camp.planned_reward / camp.planned_risk) * 0.8 ? 'text-green-400' : 'text-orange-400'
                                    : 'text-red-400'
                                }`}>
                                  Act: {camp.realized_pnl > 0 ? '1:' : '-1:'}{Math.abs(camp.realized_pnl / camp.planned_risk).toFixed(1)}
                                </span>
                              </>
                            ) : (
                              <span className="text-xs text-gray-600">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => setEditingCampaign(camp)}
                            className="text-xs text-[#FF5722] hover:text-[#F4511E] font-medium px-3 py-1.5 border border-[#FF5722]/30 rounded hover:bg-[#FF5722]/10 transition-colors"
                          >
                            Journal
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {editingCampaign && (
              <CampaignJournalModal
                campaign={editingCampaign}
                onClose={() => setEditingCampaign(null)}
                onSave={() => {
                  setEditingCampaign(null);
                  fetchExecutions();
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
