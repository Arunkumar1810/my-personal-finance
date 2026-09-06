import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialIndianEtfsTransactions: AssetTransaction[] = [
  {
    id: 'etf-tx-1',
    date: '2023-08-10',
    type: 'DEBIT',
    description: 'NIFTYBEES Lumpsum Purchase (1,000 units)',
    units: 1000,
    unitPrice: 235.0,
    grossAmount: 235000,
    charges: 120,
    netCashflow: -235120,
    status: 'completed',
  },
  {
    id: 'etf-tx-2',
    date: '2023-11-20',
    type: 'DEBIT',
    description: 'BANKBEES Initial Allocation (500 units)',
    units: 500,
    unitPrice: 505.0,
    grossAmount: 252500,
    charges: 135,
    netCashflow: -252635,
    status: 'completed',
  },
  {
    id: 'etf-tx-3',
    date: '2024-02-15',
    type: 'DEBIT',
    description: 'ITBEES Dip Buying (3,000 units)',
    units: 3000,
    unitPrice: 38.5,
    grossAmount: 115500,
    charges: 80,
    netCashflow: -115580,
    status: 'completed',
  },
  {
    id: 'etf-tx-4',
    date: '2024-05-10',
    type: 'DEBIT',
    description: 'NIFTYBEES Tranche 2 SIP (1,500 units)',
    units: 1500,
    unitPrice: 243.33,
    grossAmount: 365000,
    charges: 180,
    netCashflow: -365180,
    status: 'completed',
  },
  {
    id: 'etf-tx-5',
    date: '2024-09-18',
    type: 'CREDIT',
    description: 'NIFTYBEES Annual Dividend Distribution',
    grossAmount: 8500,
    charges: 0,
    netCashflow: 8500,
    status: 'completed',
  },
  {
    id: 'etf-tx-6',
    date: '2024-11-05',
    type: 'DEBIT',
    description: 'BANKBEES SIP Top-Up (300 units)',
    units: 300,
    unitPrice: 518.33,
    grossAmount: 155500,
    charges: 95,
    netCashflow: -155595,
    status: 'completed',
  },
  {
    id: 'etf-tx-7',
    date: '2025-01-20',
    type: 'DEBIT',
    description: 'MON100 Tech ETF Allocation (1,200 units)',
    units: 1200,
    unitPrice: 145.0,
    grossAmount: 174000,
    charges: 110,
    netCashflow: -174110,
    status: 'completed',
  },
];

export const INDIAN_ETFS_VALUATION = 1417450;

export function IndianEtfsTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialIndianEtfsTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="Indian ETFs"
      currentValuation={INDIAN_ETFS_VALUATION}
      evaluationRoute="/assets/indian-etfs/asset-evaluation"
      holdingsRoute="/assets/indian-etfs/holdings"
      transactions={transactions}
    />
  );
}
