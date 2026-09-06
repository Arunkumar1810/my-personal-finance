export interface Position {
  tradingsymbol: string;
  quantity: number;
  average_price: number;
  last_price: number;
  pnl: number;
  instrument_token?: string;
  exchange?: string;
}

export interface CampaignExecution {
  id: number;
  user_id?: string;
  ticker: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: string;
}

export interface Campaign {
  id: number;
  user_id?: string;
  ticker: string;
  status: 'open' | 'closed';
  created_at?: string;
  closed_at?: string;
  strategy?: string;
  sell_reason?: string;
  emotion?: string;
  regret_metric?: number;
  rationale?: string;
  planned_risk?: number;
  planned_reward?: number;
  executions?: CampaignExecution[];
  ai_critique?: string;
  discipline_score?: number;
}

export interface GttOrder {
  trigger_id: string;
  tradingsymbol: string;
  exchange: string;
  trigger_price: number;
  last_price: number;
  condition_type: string;
  status: string;
  created_at: string;
  orders?: Array<{
    transaction_type: string;
    quantity: number;
    price: number;
  }>;
}

export interface BrokerExecution {
  id: number;
  tradingsymbol: string;
  order_id: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: string;
  broker: string;
}
