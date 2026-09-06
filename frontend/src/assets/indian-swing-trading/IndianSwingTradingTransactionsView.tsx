import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialSwingTransactions: AssetTransaction[] = [
  {
    id: 'sw-tx-1',
    date: '2024-05-02',
    type: 'DEBIT',
    description: 'Tata Motors Breakout Entry (300 shares @ ₹960)',
    units: 300,
    unitPrice: 960,
    grossAmount: 288000,
    charges: 320,
    netCashflow: -288320,
    status: 'completed',
  },
  {
    id: 'sw-tx-2',
    date: '2024-06-14',
    type: 'CREDIT',
    description: 'Tata Motors Partial Profit Booking (+1.8R)',
    units: 150,
    unitPrice: 1040,
    grossAmount: 156000,
    charges: 180,
    netCashflow: 155820,
    status: 'completed',
  },
  {
    id: 'sw-tx-3',
    date: '2024-07-08',
    type: 'DEBIT',
    description: 'Trent 20EMA Momentum Pullback (40 shares @ ₹6,800)',
    units: 40,
    unitPrice: 6800,
    grossAmount: 272000,
    charges: 290,
    netCashflow: -272290,
    status: 'completed',
  },
  {
    id: 'sw-tx-4',
    date: '2024-08-19',
    type: 'DEBIT',
    description: 'Persistent Systems Base Breakout (50 shares @ ₹5,100)',
    units: 50,
    unitPrice: 5100,
    grossAmount: 255000,
    charges: 280,
    netCashflow: -255280,
    status: 'completed',
  },
  {
    id: 'sw-tx-5',
    date: '2024-10-12',
    type: 'CREDIT',
    description: 'Trent Target 1 Hit (+1.4R Target Exit)',
    units: 20,
    unitPrice: 7250,
    grossAmount: 145000,
    charges: 160,
    netCashflow: 144840,
    status: 'completed',
  },
];

export const SWING_TRADING_VALUATION = 592500;
export const SWING_TRADING_INVESTED = 550000;

export function IndianSwingTradingTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialSwingTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="Indian Swing Trading"
      currentValuation={SWING_TRADING_VALUATION}
      evaluationRoute="/assets/indian-swing-trading/asset-evaluation"
      holdingsRoute="/assets/indian-swing-trading/active"
      transactions={transactions}
    />
  );
}
