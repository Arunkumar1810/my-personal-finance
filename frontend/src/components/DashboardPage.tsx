import { useState, useEffect } from 'react';
import { Campaign } from './CampaignJournalModal';

export function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [dailyPnl, setDailyPnl] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const campRes = await fetch('http://localhost:8000/api/campaigns');
        const pnlRes = await fetch('http://localhost:8000/api/dashboard/daily-pnl');
        
        if (campRes.ok) {
          const data = await campRes.json();
          setCampaigns(data.campaigns);
        }
        if (pnlRes.ok) {
          const data = await pnlRes.json();
          setDailyPnl(data.daily_pnl);
        }
      } catch (e) {
        console.error('Error fetching dashboard data', e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Calculate Capital at Risk (open campaigns only)
  const capitalAtRisk = campaigns
    .filter(c => c.status === 'open')
    .reduce((acc, c) => acc + (c.planned_risk || 0), 0);

  // Calculate Max Drawdown (closed campaigns)
  // We sort closed campaigns ascending by created_at (they are descending from API)
  const closedCampaigns = [...campaigns].filter(c => c.status === 'closed').reverse();
  let peak = 0;
  let cumulativePnl = 0;
  let maxDrawdown = 0;

  for (const c of closedCampaigns) {
    cumulativePnl += c.realized_pnl || 0;
    if (cumulativePnl > peak) {
      peak = cumulativePnl;
    }
    const drawdown = peak - cumulativePnl;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  // Generate Calendar Heatmap for current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const renderHeatmapCell = (day: number | null, index: number) => {
    if (!day) return <div key={`empty-${index}`} className="h-12 border border-[#2C2C35]/50 bg-[#16161D]/30 rounded"></div>;
    
    // Format YYYY-MM-DD (assume local time for MVP)
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const pnl = dailyPnl[dateStr] || 0;
    
    let bgClass = "bg-[#2C2C35]/20";
    if (pnl > 0) {
      if (pnl > 5000) bgClass = "bg-green-500";
      else if (pnl > 1000) bgClass = "bg-green-600";
      else bgClass = "bg-green-800";
    } else if (pnl < 0) {
      if (pnl < -5000) bgClass = "bg-red-500";
      else if (pnl < -1000) bgClass = "bg-red-600";
      else bgClass = "bg-red-800";
    }

    return (
      <div key={`day-${day}`} className={`h-12 border border-[#2C2C35] rounded ${bgClass} flex flex-col justify-between p-1 group relative`}>
        <span className="text-[10px] text-gray-400 font-medium">{day}</span>
        {pnl !== 0 && (
          <span className={`text-[10px] font-bold text-right ${pnl > 0 ? 'text-green-100' : 'text-red-100'}`}>
            {pnl > 0 ? '+' : ''}{pnl.toFixed(0)}
          </span>
        )}
        
        {/* Tooltip */}
        <div className="absolute opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none z-10 whitespace-nowrap border border-[#2C2C35]">
          {dateStr}: ₹{pnl.toFixed(2)}
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="p-8 text-gray-400">Loading Dashboard...</div>;
  }

  return (
    <div className="p-8 h-full overflow-auto bg-[#0D0D12]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Risk Dashboard</h1>
        <p className="text-gray-400 mt-2">Confront your exposure and consistency.</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-[#1C1C24] p-6 rounded-xl border border-[#2C2C35] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Total Capital at Risk</p>
            <p className="text-4xl font-bold text-[#FF5722]">
              ₹{capitalAtRisk.toFixed(2)}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-[#FF5722]/10 flex items-center justify-center text-[#FF5722]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <div className="bg-[#1C1C24] p-6 rounded-xl border border-[#2C2C35] flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Max Drawdown</p>
            <p className="text-4xl font-bold text-red-500">
              -₹{maxDrawdown.toFixed(2)}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.51m-3.182 5.51l-5.511-3.181" />
            </svg>
          </div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="bg-[#1C1C24] p-6 rounded-xl border border-[#2C2C35]">
        <h2 className="text-lg font-bold text-white mb-4">Daily Realized P/L Heatmap</h2>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-500 pb-2">{d}</div>
          ))}
          {days.map((day, i) => renderHeatmapCell(day, i))}
        </div>
      </div>

    </div>
  );
}
