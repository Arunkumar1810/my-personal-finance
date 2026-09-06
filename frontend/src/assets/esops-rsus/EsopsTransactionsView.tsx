import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialEsopTransactions: AssetTransaction[] = [
  {
    id: 'esop-tx-1',
    date: '2023-10-01',
    type: 'DEBIT',
    description: 'Grant #2023-A Allocation (10,000 options @ ₹50 strike)',
    units: 10000,
    unitPrice: 50,
    grossAmount: 500000,
    charges: 0,
    netCashflow: -125000, // Capital committed to 25% cliff exercise
    status: 'completed',
  },
  {
    id: 'esop-tx-2',
    date: '2024-10-01',
    type: 'CREDIT',
    description: 'Cliff Milestone Vested (2,500 options unlocked at ₹420 FMV)',
    units: 2500,
    unitPrice: 420,
    grossAmount: 1050000,
    charges: 0,
    netCashflow: 0, // Book value unlock, non-cash until exercise/sale
    status: 'completed',
  },
  {
    id: 'esop-tx-3',
    date: '2024-12-15',
    type: 'DEBIT',
    description: 'Tranche 1 Exercise Outlay (1,000 options exercised @ ₹50)',
    units: 1000,
    unitPrice: 50,
    grossAmount: 50000,
    charges: 15600, // Perquisite tax advance
    netCashflow: -65600,
    status: 'completed',
  },
];

export const ESOPS_VALUATION = 1050000;
export const ESOPS_INVESTED = 190600;

export function EsopsTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialEsopTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="ESOPs & RSUs"
      currentValuation={ESOPS_VALUATION}
      evaluationRoute="/assets/esops/asset-evaluation"
      holdingsRoute="/assets/esops/grants"
      transactions={transactions}
    />
  );
}
