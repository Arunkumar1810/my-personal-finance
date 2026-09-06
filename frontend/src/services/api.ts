export const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8000/api/orchestrator';

const fetchJSON = async (url: string, options?: RequestInit) => {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }
    return res.json();
};

export const fetchInbox = async () => {
    return fetchJSON(`${API_BASE_URL}/inbox`);
};

export const fetchValuations = async () => {
    return fetchJSON(`${API_BASE_URL}/valuations`);
};

export const fetchLiabilities = async () => {
    return fetchJSON(`${API_BASE_URL}/liabilities`);
};

export const saveLiability = async (liability: {
    id?: string;
    name: string;
    total_amount: number;
    apr: number;
    monthly_emi: number;
    next_due_date?: string;
    autopay_enabled?: boolean;
}) => {
    return fetchJSON(`${API_BASE_URL}/liabilities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(liability),
    });
};

export const fetchGoals = async () => {
    return fetchJSON(`${API_BASE_URL}/goals`);
};

export const saveGoal = async (goal: {
    id?: string;
    name: string;
    target_amount: number;
    current_saved: number;
    target_date?: string;
}) => {
    return fetchJSON(`${API_BASE_URL}/goals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(goal),
    });
};

export const resolveInboxAlert = async (title: string) => {
    return fetchJSON(`${API_BASE_URL}/inbox/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
};

export const scrubTimeline = async (payload: { months_offset: number; stress_test_drop: number }) => {
    return fetchJSON(`${API_BASE_URL}/scrubber`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
};

