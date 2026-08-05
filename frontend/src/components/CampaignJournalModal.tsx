import { useState, useEffect } from 'react';

export interface Campaign {
  id: number;
  ticker: string;
  status: string;
  created_at: string;
  entry_price: number;
  exit_price: number;
  realized_pnl: number;
  executions_count: number;
  strategy?: string;
  sell_reason?: string;
  emotion?: string;
  regret_metric?: number;
  rationale?: string;
  planned_risk?: number;
  planned_reward?: number;
  ai_analysis?: string;
}

interface Props {
  campaign: Campaign;
  onClose: () => void;
  onSave: () => void;
}

const STRATEGIES = ['Breakout', 'Pullback', 'Mean Reversion', 'Trend Following', 'Other'];
const SELL_REASONS = ['Target Reached', 'Stoploss Triggered', 'Time Stop', 'Trailing Stop Hit', 'Calculated Sell', 'Panic Sell'];
const EMOTIONS = ['Neutral', 'Confident', 'Anxious', 'FOMO', 'Greedy', 'Fearful'];

export function CampaignJournalModal({ campaign, onClose, onSave }: Props) {
  const [strategy, setStrategy] = useState(campaign.strategy || '');
  const [sellReason, setSellReason] = useState(campaign.sell_reason || '');
  const [emotion, setEmotion] = useState(campaign.emotion || '');
  const [regretMetric, setRegretMetric] = useState(campaign.regret_metric || 1);
  const [rationale, setRationale] = useState(campaign.rationale || '');
  const [plannedRisk, setPlannedRisk] = useState(campaign.planned_risk || 0);
  const [plannedReward, setPlannedReward] = useState(campaign.planned_reward || 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [aiAnalysis, setAiAnalysis] = useState(campaign.ai_analysis || '');
  const [analyzing, setAnalyzing] = useState(false);

  const handleGenerateAI = async () => {
    try {
      setAnalyzing(true);
      setError(null);
      const res = await fetch(`http://localhost:8000/api/campaigns/${campaign.id}/ai-analysis`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to generate AI analysis');
      const data = await res.json();
      setAiAnalysis(data.ai_analysis);
      // Since it's saved in the backend, no need to trigger onSave for this, but we show it
    } catch (err: any) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch(`http://localhost:8000/api/campaigns/${campaign.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: strategy || null,
          sell_reason: sellReason || null,
          emotion: emotion || null,
          regret_metric: regretMetric,
          rationale: rationale || null,
          planned_risk: plannedRisk || null,
          planned_reward: plannedReward || null,
        })
      });
      if (!res.ok) throw new Error('Failed to save journal entry');
      onSave();
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1C1C24] rounded-xl border border-[#2C2C35] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-[#2C2C35] flex justify-between items-center bg-[#2C2C35]/30">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center">
              Journal: {campaign.ticker} Campaign
            </h2>
            <p className="text-sm text-gray-400 mt-1">Realized P/L: ₹{campaign.realized_pnl.toFixed(2)}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Strategy</label>
              <select 
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full bg-black/20 border border-[#2C2C35] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF5722]"
              >
                <option value="">Select Strategy...</option>
                {STRATEGIES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Sell Reason</label>
              <select 
                value={sellReason}
                onChange={(e) => setSellReason(e.target.value)}
                className="w-full bg-black/20 border border-[#2C2C35] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF5722]"
              >
                <option value="">Select Reason...</option>
                {SELL_REASONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Emotion at Execution</label>
              <select 
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full bg-black/20 border border-[#2C2C35] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF5722]"
              >
                <option value="">Select Emotion...</option>
                {EMOTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="block text-sm font-medium text-gray-300">Regret Metric (1-5)</label>
                <span className="text-sm font-bold text-[#FF5722]">{regretMetric}</span>
              </div>
              <input 
                type="range" 
                min="1" max="5" step="1"
                value={regretMetric}
                onChange={(e) => setRegretMetric(parseInt(e.target.value))}
                className="w-full accent-[#FF5722]"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>1 - None</span>
                <span>5 - High Regret</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Planned Risk (₹)</label>
              <input 
                type="number" 
                value={plannedRisk || ''}
                onChange={(e) => setPlannedRisk(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/20 border border-[#2C2C35] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF5722]"
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Planned Reward (₹)</label>
              <input 
                type="number" 
                value={plannedReward || ''}
                onChange={(e) => setPlannedReward(parseFloat(e.target.value) || 0)}
                className="w-full bg-black/20 border border-[#2C2C35] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#FF5722]"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300 flex justify-between">
              <span>Rationale / Journal Entry</span>
              <span className="text-xs text-gray-500">Markdown supported</span>
            </label>
            <textarea 
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Why did you take this trade? Did you stick to your plan?..."
              className="w-full bg-black/20 border border-[#2C2C35] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF5722] min-h-[150px] font-mono text-sm"
            />
          </div>
          
          {campaign.status === 'closed' && (
            <div className="space-y-4 pt-4 border-t border-[#2C2C35]">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-purple-400">
                    <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
                  </svg>
                  AI Coaching & Post-Mortem
                </h3>
                {!aiAnalysis && (
                  <button
                    onClick={handleGenerateAI}
                    disabled={analyzing}
                    className="px-4 py-1.5 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 text-purple-300 font-medium rounded-lg transition-colors disabled:opacity-50 text-sm"
                  >
                    {analyzing ? 'Analyzing...' : 'Run AI Post-Mortem'}
                  </button>
                )}
              </div>
              
              {aiAnalysis && (
                <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-4 font-mono text-sm text-purple-200/90 whitespace-pre-wrap">
                  {aiAnalysis}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#2C2C35] flex justify-end space-x-3 bg-[#2C2C35]/10">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-lg font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 bg-[#FF5722] hover:bg-[#F4511E] text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Journal'}
          </button>
        </div>
      </div>
    </div>
  );
}
