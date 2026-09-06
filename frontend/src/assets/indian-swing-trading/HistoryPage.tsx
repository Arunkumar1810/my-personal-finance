import { useState, useEffect, useCallback } from 'react';
import { CampaignJournalModal } from './CampaignJournalModal';
import type { Campaign as ModalCampaign } from './CampaignJournalModal';

interface RawExecution {
  id: number;
  ticker: string;
  side: string;
  quantity: number;
  price: number;
  timestamp: string;
}

interface ToastState {
  message: string;
  type: 'success' | 'error';
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

  // Tradebook sync state
  const [showTradebookModal, setShowTradebookModal] = useState(false);
  const [tradebookSyncing, setTradebookSyncing] = useState(false);
  const [tbUserId, setTbUserId] = useState('');
  const [tbPassword, setTbPassword] = useState('');
  const [tbTotpCode, setTbTotpCode] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  }, []);

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

  const handleTradebookSync = async () => {
    if (!tbUserId.trim() || !tbPassword.trim() || !tbTotpCode.trim()) return;
    try {
      setTradebookSyncing(true);
      setError(null);
      const body: Record<string, string> = {
        user_id: tbUserId.trim(),
        password: tbPassword.trim(),
        totp_code: tbTotpCode.trim(),
      };
      if (fromDate) body.from_date = fromDate;
      if (toDate) body.to_date = toDate;

      const res = await fetch('http://localhost:8000/api/console/tradebook-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        let errMsg = 'Tradebook sync failed';
        try {
          const errData = await res.json();
          if (errData && errData.detail) errMsg = errData.detail;
        } catch (e) { }
        if (res.status === 401) {
          errMsg = 'Authentication failed. Please check your Zerodha credentials and TOTP code.';
        }
        throw new Error(errMsg);
      }

      const data = await res.json();
      showToast(`Tradebook synced! ${data.synced_count} new trades saved (${data.total_fetched} total fetched).`, 'success');
      setShowTradebookModal(false);
      setTbUserId('');
      setTbPassword('');
      setTbTotpCode('');
      setFromDate('');
      setToDate('');
      await fetchExecutions();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setTradebookSyncing(false);
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

  const [tickerFilter, setTickerFilter] = useState('');
  const [campaignStatusFilter, setCampaignStatusFilter] = useState<'all'|'open'|'closed'>('all');
  
  const filteredExecutions = executions.filter(ex => 
    ex.ticker.toLowerCase().includes(tickerFilter.toLowerCase())
  );

  const processedCampaigns = campaigns
    .filter(camp => campaignStatusFilter === 'all' || camp.status === campaignStatusFilter)
    .sort((a, b) => {
      // Sort by last_sell_date descending. If null, push to bottom (or top? user said "sort by last stock sold data")
      // Usually, open campaigns with no sell date are newer, let's fall back to first_buy_date or created_at
      const dateA = a.last_sell_date ? new Date(a.last_sell_date).getTime() : (a.first_buy_date ? new Date(a.first_buy_date).getTime() : new Date(a.created_at).getTime());
      const dateB = b.last_sell_date ? new Date(b.last_sell_date).getTime() : (b.first_buy_date ? new Date(b.first_buy_date).getTime() : new Date(b.created_at).getTime());
      return dateB - dateA;
    });

  return (
    <div className="p-8 max-w-[95%] mx-auto h-full flex flex-col">
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
        <div className="flex space-x-3 items-center">
          {activeTab === 'raw' && (
            <input 
              type="text"
              placeholder="Filter by ticker..."
              value={tickerFilter}
              onChange={(e) => setTickerFilter(e.target.value)}
              className="px-4 py-2 bg-[#1C1C24] border border-[#2C2C35] text-white text-sm rounded-lg focus:ring-[#FF5722] focus:border-[#FF5722] placeholder-gray-500 w-48 mr-2"
            />
          )}
          {activeTab === 'campaigns' && (
            <select
              value={campaignStatusFilter}
              onChange={(e) => setCampaignStatusFilter(e.target.value as 'all'|'open'|'closed')}
              className="px-4 py-2 bg-[#1C1C24] border border-[#2C2C35] text-white text-sm rounded-lg focus:ring-[#FF5722] focus:border-[#FF5722] w-32 mr-2"
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          )}
          {activeTab === 'raw' && selectedIds.size > 0 && (
            <>
              {(() => {
                const selectedEx = executions.filter(e => selectedIds.has(e.id));
                const ticker = selectedEx.length > 0 ? selectedEx[0].ticker : '';
                const allSameTicker = selectedEx.length > 0 && selectedEx.every(e => e.ticker === ticker);
                const matchingOpenCampaigns = allSameTicker ? campaigns.filter(c => c.ticker === ticker && c.status === 'open') : [];
                
                return (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCreateCampaign}
                      className="px-4 py-2 bg-[#2196F3] hover:bg-[#1E88E5] text-white font-medium rounded-lg transition-colors shadow-lg shadow-[#2196F3]/20"
                    >
                      New Campaign ({selectedIds.size})
                    </button>
                    
                    {matchingOpenCampaigns.length > 0 && (
                      <div className="flex items-center space-x-2 border-l border-[#2C2C35] pl-2 ml-2">
                        <select 
                          id="addToCampaignSelect"
                          className="bg-[#1C1C24] border border-[#2C2C35] text-white text-sm rounded-lg focus:ring-[#FF5722] focus:border-[#FF5722] block p-2"
                        >
                          {matchingOpenCampaigns.map(c => (
                            <option key={c.id} value={c.id}>
                              Add to #{c.id} ({c.executions_count} trades)
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={async () => {
                            const selectEl = document.getElementById('addToCampaignSelect') as HTMLSelectElement;
                            const campId = selectEl.value;
                            if (!campId) return;
                            try {
                              setError(null);
                              const res = await fetch(`http://localhost:8000/api/campaigns/${campId}/executions`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ execution_ids: Array.from(selectedIds) })
                              });
                              if (!res.ok) throw new Error('Failed to add executions to campaign');
                              setSelectedIds(new Set());
                              await fetchExecutions();
                              const updatedRes = await fetch('http://localhost:8000/api/campaigns');
                              if (updatedRes.ok) {
                                const data = await updatedRes.json();
                                setCampaigns(data.campaigns);
                              }
                              setActiveTab('campaigns');
                            } catch (err: any) {
                              setError(err.message);
                            }
                          }}
                          className="px-4 py-2 bg-[#4CAF50] hover:bg-[#43A047] text-white font-medium rounded-lg transition-colors shadow-lg shadow-[#4CAF50]/20"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </>
          )}
          <button
            onClick={() => setShowTradebookModal(true)}
            className="px-4 py-2 bg-[#7C4DFF] hover:bg-[#651FFF] text-white font-medium rounded-lg transition-colors flex items-center shadow-lg shadow-[#7C4DFF]/20"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Sync Tradebook
          </button>
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
                  ) : filteredExecutions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        {executions.length === 0 ? "No raw executions found. Click Sync Trades to fetch." : "No executions match the filter."}
                      </td>
                    </tr>
                  ) : (
                    filteredExecutions.map(ex => (
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
                    <th className="px-6 py-3 font-medium text-gray-400">Duration</th>
                    <th className="px-6 py-3 font-medium text-gray-400">Ticker</th>
                    <th className="px-6 py-3 font-medium text-gray-400">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Quantities</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Avg Entry</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Avg Exit</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">Performance</th>
                    <th className="px-6 py-3 font-medium text-gray-400 text-right">R/R (Plan vs Act)</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2C2C35]">
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-center text-gray-500">Loading campaigns...</td>
                    </tr>
                  ) : processedCampaigns.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-6 py-8 text-center text-gray-500">No campaigns found.</td>
                    </tr>
                  ) : (
                    processedCampaigns.map(camp => (
                      <tr key={camp.id} className="hover:bg-[#1C1C24]/50 transition-colors">
                        <td className="px-6 py-4 text-gray-300">
                          <div className="flex flex-col text-xs">
                            <span className="text-gray-400">In: {camp.first_buy_date ? new Date(camp.first_buy_date).toLocaleDateString() : '-'}</span>
                            {camp.last_sell_date && (
                              <span className="text-gray-400">Out: {new Date(camp.last_sell_date).toLocaleDateString()}</span>
                            )}
                            {camp.emotion && <span className="text-gray-500 mt-1">{camp.emotion} (R:{camp.regret_metric})</span>}
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
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col text-sm">
                            <span className="text-green-400">Buy: {camp.total_buy_qty || 0}</span>
                            <span className="text-red-400">Sell: {camp.total_sell_qty || 0}</span>
                            {((camp.total_buy_qty || 0) - (camp.total_sell_qty || 0)) !== 0 && (
                              <span className="text-gray-400 mt-1 pt-1 border-t border-[#2C2C35]">Open: {(camp.total_buy_qty || 0) - (camp.total_sell_qty || 0)}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-gray-300">₹{camp.entry_price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right text-gray-300">₹{camp.exit_price.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <span className={`font-medium ${camp.realized_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {camp.realized_pnl >= 0 ? '+' : ''}₹{camp.realized_pnl.toFixed(2)}
                            </span>
                            {camp.xirr !== undefined && camp.xirr !== null && (
                              <span className={`text-xs mt-1 ${camp.xirr >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                XIRR: {(camp.xirr * 100).toFixed(2)}%
                              </span>
                            )}
                          </div>
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
                          <div className="flex flex-col gap-2 items-end">
                            <button 
                              onClick={() => setEditingCampaign(camp)}
                              className="text-xs text-[#FF5722] hover:text-[#F4511E] font-medium px-3 py-1.5 border border-[#FF5722]/30 rounded hover:bg-[#FF5722]/10 transition-colors w-full text-center"
                            >
                              Journal
                            </button>
                            {camp.status === 'open' && (
                              <button 
                                onClick={async () => {
                                  try {
                                    const res = await fetch(`http://localhost:8000/api/campaigns/${camp.id}`, {
                                      method: 'PATCH',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ status: 'closed' })
                                    });
                                    if (res.ok) {
                                      // Refresh campaigns
                                      const updatedRes = await fetch('http://localhost:8000/api/campaigns');
                                      if (updatedRes.ok) {
                                        const data = await updatedRes.json();
                                        setCampaigns(data.campaigns);
                                      }
                                    }
                                  } catch (err) {
                                    console.error('Failed to close campaign', err);
                                  }
                                }}
                                className="text-xs text-gray-400 hover:text-white font-medium px-3 py-1.5 border border-gray-600/50 rounded hover:bg-gray-800 transition-colors w-full text-center"
                              >
                                Close
                              </button>
                            )}
                          </div>
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

      {/* Tradebook Sync Modal */}
      {showTradebookModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1C1C24] rounded-2xl border border-[#2C2C35] shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-[#2C2C35]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Sync Tradebook</h3>
                  <p className="text-sm text-gray-400 mt-1">Import historical trades from Zerodha Console</p>
                </div>
                <button
                  onClick={() => { setShowTradebookModal(false); setTbUserId(''); setTbPassword(''); setTbTotpCode(''); setFromDate(''); setToDate(''); }}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Zerodha User ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={tbUserId}
                  onChange={(e) => setTbUserId(e.target.value.toUpperCase())}
                  placeholder="e.g. AB1234"
                  className="w-full px-4 py-3 bg-[#16161D] border border-[#2C2C35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 focus:border-[#7C4DFF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <input
                  type="password"
                  value={tbPassword}
                  onChange={(e) => setTbPassword(e.target.value)}
                  placeholder="Your Zerodha password"
                  className="w-full px-4 py-3 bg-[#16161D] border border-[#2C2C35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 focus:border-[#7C4DFF] transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  TOTP Code <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={tbTotpCode}
                  onChange={(e) => setTbTotpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="6-digit TOTP from authenticator"
                  maxLength={6}
                  className="w-full px-4 py-3 bg-[#16161D] border border-[#2C2C35] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 focus:border-[#7C4DFF] transition-colors font-mono tracking-widest"
                />
                <p className="text-xs text-gray-500 mt-1.5">
                  Enter the current code from your authenticator app
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#16161D] border border-[#2C2C35] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 focus:border-[#7C4DFF] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#16161D] border border-[#2C2C35] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#7C4DFF]/50 focus:border-[#7C4DFF] transition-colors"
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-[#2C2C35] flex justify-end space-x-3">
              <button
                onClick={() => { setShowTradebookModal(false); setTbUserId(''); setTbPassword(''); setTbTotpCode(''); setFromDate(''); setToDate(''); }}
                className="px-4 py-2.5 text-gray-400 hover:text-white font-medium rounded-lg transition-colors hover:bg-[#2C2C35]"
              >
                Cancel
              </button>
              <button
                onClick={handleTradebookSync}
                disabled={tradebookSyncing || !tbUserId.trim() || !tbPassword.trim() || !tbTotpCode.trim()}
                className="px-6 py-2.5 bg-[#7C4DFF] hover:bg-[#651FFF] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg shadow-[#7C4DFF]/20"
              >
                {tradebookSyncing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Syncing...
                  </>
                ) : (
                  'Sync Tradebook'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out]">
          <div className={`flex items-center px-5 py-3.5 rounded-xl shadow-2xl border ${
            toast.type === 'success'
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            <span className="mr-3 text-lg">{toast.type === 'success' ? '✓' : '✕'}</span>
            <span className="text-sm font-medium max-w-sm">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-4 text-current opacity-60 hover:opacity-100 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
