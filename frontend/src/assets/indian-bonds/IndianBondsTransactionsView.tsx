import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialBondTransactions: AssetTransaction[] = [
  {
    id: 'bnd-tx-1',
    date: '2021-10-15',
    type: 'DEBIT',
    description: 'SGB 2029 Series IV Primary Subscription (50 units @ ₹4,800)',
    units: 50,
    unitPrice: 4800,
    grossAmount: 240000,
    charges: 0,
    netCashflow: -240000,
    status: 'completed',
  },
  {
    id: 'bnd-tx-2',
    date: '2022-03-20',
    type: 'DEBIT',
    description: 'NHAI Tax-Free 8.20% Bonds Secondary Purchase (100 units)',
    units: 100,
    unitPrice: 1000,
    grossAmount: 100000,
    charges: 120,
    netCashflow: -100120,
    status: 'completed',
  },
  {
    id: 'bnd-tx-3',
    date: '2023-04-15',
    type: 'CREDIT',
    description: 'SGB Semiannual Interest Payout (2.5% p.a.)',
    grossAmount: 3000,
    charges: 0,
    netCashflow: 3000,
    status: 'completed',
  },
  {
    id: 'bnd-tx-4',
    date: '2023-08-14',
    type: 'DEBIT',
    description: '7.18% GS 2033 Sovereign Benchmark Allocation (Face ₹4,00,000)',
    units: 400,
    unitPrice: 1000,
    grossAmount: 400000,
    charges: 250,
    netCashflow: -400250,
    status: 'completed',
  },
  {
    id: 'bnd-tx-5',
    date: '2024-02-14',
    type: 'CREDIT',
    description: '7.18% GS 2033 Semiannual Sovereign Coupon',
    grossAmount: 14360,
    charges: 0,
    netCashflow: 14360,
    status: 'completed',
  },
  {
    id: 'bnd-tx-6',
    date: '2024-08-14',
    type: 'CREDIT',
    description: '7.18% GS 2033 Semiannual Sovereign Coupon',
    grossAmount: 14360,
    charges: 0,
    netCashflow: 14360,
    status: 'completed',
  },
];

export const INDIAN_BONDS_VALUATION = 883700;
export const INDIAN_BONDS_INVESTED = 740000;

export function IndianBondsTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialBondTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="Indian Bonds & SGBs"
      currentValuation={INDIAN_BONDS_VALUATION}
      evaluationRoute="/assets/indian-bonds/asset-evaluation"
      holdingsRoute="/assets/indian-bonds/holdings"
      transactions={transactions}
    />
  );
}
