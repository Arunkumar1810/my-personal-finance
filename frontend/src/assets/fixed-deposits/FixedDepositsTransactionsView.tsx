import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialFdTransactions: AssetTransaction[] = [
  {
    id: 'fd-tx-1',
    date: '2023-03-15',
    type: 'DEBIT',
    description: 'HDFC Bank Term Deposit Principal (7.25% p.a.)',
    grossAmount: 200000,
    charges: 0,
    netCashflow: -200000,
    status: 'completed',
  },
  {
    id: 'fd-tx-2',
    date: '2023-11-20',
    type: 'DEBIT',
    description: 'SBI Special Term Deposit Principal (7.00% p.a.)',
    grossAmount: 150000,
    charges: 0,
    netCashflow: -150000,
    status: 'completed',
  },
  {
    id: 'fd-tx-3',
    date: '2024-03-31',
    type: 'CREDIT',
    description: 'HDFC Bank FY24 Accrued Interest Credit',
    grossAmount: 14500,
    charges: 1450, // 10% TDS
    netCashflow: 13050,
    status: 'completed',
  },
  {
    id: 'fd-tx-4',
    date: '2024-06-10',
    type: 'DEBIT',
    description: 'ICICI Bank 1-Year Liquidity Ladder (7.50% p.a.)',
    grossAmount: 300000,
    charges: 0,
    netCashflow: -300000,
    status: 'completed',
  },
  {
    id: 'fd-tx-5',
    date: '2024-11-20',
    type: 'CREDIT',
    description: 'SBI Annual Interest Payout',
    grossAmount: 10500,
    charges: 1050,
    netCashflow: 9450,
    status: 'completed',
  },
  {
    id: 'fd-tx-6',
    date: '2025-01-15',
    type: 'DEBIT',
    description: 'Kotak Bank Senior Citizen / High-Yield Tranche (7.65% p.a.)',
    grossAmount: 100000,
    charges: 0,
    netCashflow: -100000,
    status: 'completed',
  },
];

export const FIXED_DEPOSITS_VALUATION = 814200;
export const FIXED_DEPOSITS_INVESTED = 750000;

export function FixedDepositsTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialFdTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="Fixed Deposits"
      currentValuation={FIXED_DEPOSITS_VALUATION}
      evaluationRoute="/assets/fixed-deposits/asset-evaluation"
      holdingsRoute="/assets/fixed-deposits/active"
      transactions={transactions}
    />
  );
}
