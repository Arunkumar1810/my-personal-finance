import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialIndianLtStocksTransactions: AssetTransaction[] = [
  {
    id: 'lts-tx-1',
    date: '2022-04-12',
    type: 'DEBIT',
    description: 'RELIANCE Core Allocation (150 shares)',
    units: 150,
    unitPrice: 2450.0,
    grossAmount: 367500,
    charges: 280,
    netCashflow: -367780,
    status: 'completed',
  },
  {
    id: 'lts-tx-2',
    date: '2022-08-25',
    type: 'DEBIT',
    description: 'TCS Initial Accumulation (80 shares)',
    units: 80,
    unitPrice: 3400.0,
    grossAmount: 272000,
    charges: 210,
    netCashflow: -272210,
    status: 'completed',
  },
  {
    id: 'lts-tx-3',
    date: '2023-01-18',
    type: 'DEBIT',
    description: 'INFY Tech Dip Buy (200 shares)',
    units: 200,
    unitPrice: 1420.0,
    grossAmount: 284000,
    charges: 220,
    netCashflow: -284220,
    status: 'completed',
  },
  {
    id: 'lts-tx-4',
    date: '2023-05-15',
    type: 'DEBIT',
    description: 'HDFCBANK Banking Bedrock (250 shares)',
    units: 250,
    unitPrice: 1510.0,
    grossAmount: 377500,
    charges: 290,
    netCashflow: -377790,
    status: 'completed',
  },
  {
    id: 'lts-tx-5',
    date: '2023-11-10',
    type: 'CREDIT',
    description: 'TCS Special Dividend Interim',
    grossAmount: 18400,
    charges: 0,
    netCashflow: 18400,
    status: 'completed',
  },
  {
    id: 'lts-tx-6',
    date: '2024-03-20',
    type: 'DEBIT',
    description: 'Portfolio Expansion Basket (Diverse midcaps)',
    units: 450,
    unitPrice: 1200.0,
    grossAmount: 540000,
    charges: 420,
    netCashflow: -540420,
    status: 'completed',
  },
  {
    id: 'lts-tx-7',
    date: '2024-08-28',
    type: 'CREDIT',
    description: 'RELIANCE Annual Final Dividend',
    grossAmount: 14200,
    charges: 0,
    netCashflow: 14200,
    status: 'completed',
  },
  {
    id: 'lts-tx-8',
    date: '2024-12-05',
    type: 'DEBIT',
    description: 'HDFCBANK Tranche 2 Top-up',
    units: 100,
    unitPrice: 1580.0,
    grossAmount: 158000,
    charges: 130,
    netCashflow: -158130,
    status: 'completed',
  },
];

export const INDIAN_LT_STOCKS_VALUATION = 3482400;
export const INDIAN_LT_STOCKS_INVESTED = 2640400;

export function IndianLtStocksTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialIndianLtStocksTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="Indian Long-Term Stocks"
      currentValuation={INDIAN_LT_STOCKS_VALUATION}
      evaluationRoute="/assets/indian-lt-stocks/asset-evaluation"
      holdingsRoute="/assets/indian-lt-stocks/holdings"
      transactions={transactions}
    />
  );
}
