import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialPfTransactions: AssetTransaction[] = [
  {
    id: 'pf-tx-1',
    date: '2023-01-31',
    type: 'DEBIT',
    description: 'EPF Monthly Contribution (Employee + Employer Share)',
    grossAmount: 30000,
    charges: 0,
    netCashflow: -30000,
    status: 'completed',
  },
  {
    id: 'pf-tx-2',
    date: '2023-07-31',
    type: 'DEBIT',
    description: 'EPF Monthly Contribution (Employee + Employer Share)',
    grossAmount: 30000,
    charges: 0,
    netCashflow: -30000,
    status: 'completed',
  },
  {
    id: 'pf-tx-3',
    date: '2024-03-31',
    type: 'CREDIT',
    description: 'EPFO Statutory Annual Interest Credit (8.15% p.a.)',
    grossAmount: 112000,
    charges: 0,
    netCashflow: 112000,
    status: 'completed',
  },
  {
    id: 'pf-tx-4',
    date: '2024-06-30',
    type: 'DEBIT',
    description: 'VPF Voluntary Additional Contribution',
    grossAmount: 50000,
    charges: 0,
    netCashflow: -50000,
    status: 'completed',
  },
  {
    id: 'pf-tx-5',
    date: '2025-03-31',
    type: 'CREDIT',
    description: 'EPFO Statutory Annual Interest Credit (8.25% p.a.)',
    grossAmount: 134500,
    charges: 0,
    netCashflow: 134500,
    status: 'completed',
  },
  {
    id: 'pf-tx-6',
    date: '2025-07-31',
    type: 'DEBIT',
    description: 'EPF Monthly Contribution (Employee + Employer Share)',
    grossAmount: 30000,
    charges: 0,
    netCashflow: -30000,
    status: 'completed',
  },
];

export const PF_VALUATION = 1850000;
export const PF_INVESTED = 1420000;

export function PfTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialPfTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="Provident Fund (EPF/PPF)"
      currentValuation={PF_VALUATION}
      evaluationRoute="/assets/pf/asset-evaluation"
      holdingsRoute="/assets/pf/ledger"
      transactions={transactions}
    />
  );
}
