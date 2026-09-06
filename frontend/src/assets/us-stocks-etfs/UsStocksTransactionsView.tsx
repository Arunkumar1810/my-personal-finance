import { useState } from 'react';
import { AssetTransactionsTemplate } from '../shared/AssetTransactionsTemplate';
import type { AssetTransaction } from '../../types/asset-evaluation';

export const initialUsStocksTransactions: AssetTransaction[] = [
  {
    id: 'us-tx-1',
    date: '2023-03-15',
    type: 'DEBIT',
    description: 'AAPL Initial Position (50 shares @ $175)',
    units: 50,
    unitPrice: 14525, // INR equivalent at 83/USD
    grossAmount: 726250,
    charges: 1200,
    netCashflow: -727450,
    status: 'completed',
  },
  {
    id: 'us-tx-2',
    date: '2023-07-10',
    type: 'DEBIT',
    description: 'MSFT Growth Allocation (30 shares @ $340)',
    units: 30,
    unitPrice: 28220,
    grossAmount: 846600,
    charges: 1400,
    netCashflow: -848000,
    status: 'completed',
  },
  {
    id: 'us-tx-3',
    date: '2023-11-20',
    type: 'CREDIT',
    description: 'AAPL & MSFT Quarterly Dividend (Net of 25% US Withholding)',
    grossAmount: 12800,
    charges: 0,
    netCashflow: 12800,
    status: 'completed',
  },
  {
    id: 'us-tx-4',
    date: '2024-02-18',
    type: 'DEBIT',
    description: 'NVDA AI Semiconductor Allocation (80 shares @ $95 post-split)',
    units: 80,
    unitPrice: 7885,
    grossAmount: 630800,
    charges: 950,
    netCashflow: -631750,
    status: 'completed',
  },
  {
    id: 'us-tx-5',
    date: '2024-08-15',
    type: 'CREDIT',
    description: 'Semiannual Dividend Inflow',
    grossAmount: 16400,
    charges: 0,
    netCashflow: 16400,
    status: 'completed',
  },
];

export const US_STOCKS_VALUATION = 2811900;
export const US_STOCKS_INVESTED = 2207200;

export function UsStocksTransactionsView() {
  const [transactions] = useState<AssetTransaction[]>(initialUsStocksTransactions);

  return (
    <AssetTransactionsTemplate
      assetTitle="US Stocks & ETFs"
      currentValuation={US_STOCKS_VALUATION}
      evaluationRoute="/assets/us-stocks/asset-evaluation"
      holdingsRoute="/assets/us-stocks/holdings"
      transactions={transactions}
    />
  );
}
