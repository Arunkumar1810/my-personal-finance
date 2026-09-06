export interface Liability {
  id: string;
  name: string;
  total_amount: number;
  apr: number;
  monthly_emi: number;
  next_due_date: string;
  autopay_enabled: boolean;
}

export interface Goal {
  id: string;
  name: string;
  target_amount: number;
  current_saved: number;
  target_date: string;
  monthly_sip?: number;
}

export interface ValuationData {
  total_net_worth: number;
  total_assets: number;
  total_liabilities: number;
  cash_balance: number;
  breakdown: Record<string, number>;
  performance: {
    twr: number;
    xirr: number;
    max_drawdown: number;
    volatility: number;
  };
  historical: Array<{
    date: string;
    net_worth: number;
    invested: number;
  }>;
}

export interface ScrubberPayload {
  months_offset: number;
  stress_test_drop: number;
}

export interface ScrubberResponse {
  projected_net_worth: number;
  projected_liquid_cash: number;
  baseline_net_worth: number;
  baseline_liquid_cash: number;
  stress_impact: number;
  assumed_cagr: number;
  months_projected: number;
  monthly_surplus: number;
}

export interface InboxAlert {
  id: string;
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  category: string;
  action_label?: string;
  action_url?: string;
}
