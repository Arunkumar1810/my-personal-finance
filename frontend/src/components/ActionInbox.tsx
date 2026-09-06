import { useEffect, useState } from 'react';
import { fetchInbox, resolveInboxAlert } from '../services/api';

export const ActionInbox = () => {
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        fetchInbox()
            .then(data => setAlerts(data.alerts || []))
            .catch(err => console.error('Failed to fetch action inbox:', err));
    }, []);

    const handleResolve = async (index: number) => {
        const target = alerts[index];
        if (target && target.title) {
            try {
                await resolveInboxAlert(target.title);
            } catch (e) {
                console.error('Failed to resolve alert on backend', e);
            }
        }
        setAlerts(alerts.filter((_, i) => i !== index));
    };


    if (alerts.length === 0) return null;

    return (
        <div className="bg-panel border border-bordercol p-4 rounded-xl mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Action Inbox</h3>
            <div className="space-y-4">
                {alerts.map((a, i) => (
                    <div key={i} className="flex justify-between items-center bg-[#0D0D12] p-4 rounded-lg border border-rose-500/30">
                        <div>
                            <div className="text-sm font-semibold text-rose-400">{a.title}</div>
                            <div className="text-xs text-gray-400 mt-1">Amount: {a.amount} | Due: {a.due_date}</div>
                        </div>
                        <button 
                            onClick={() => handleResolve(i)}
                            className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-rose-500 hover:text-white transition-colors"
                        >
                            Resolve
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
