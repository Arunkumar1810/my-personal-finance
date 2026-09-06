import { calculateXirr, buildCashflowSeries } from './xirrCalculator';
import type { AssetTransaction } from '../types/asset-evaluation';

function assert(condition: boolean, msg: string) {
  if (!condition) {
    console.error(`❌ Assertion failed: ${msg}`);
    throw new Error(`Assertion failed: ${msg}`);
  } else {
    console.log(`✓ ${msg}`);
  }
}

console.log('Running XIRR Calculator Validation Suite...\n');

// Test 1: Simple 1-year 100% return
const simpleDouble = [
  { date: '2024-01-01', amount: -10000 },
  { date: '2025-01-01', amount: 20000 },
];
const res1 = calculateXirr(simpleDouble);
console.log('Test 1 (Doubling in 1 yr):', res1);
assert(res1.xirr !== null && Math.abs(res1.xirr - 100) < 1.0, `Expected ~100%, got ${res1.xirr}%`);

// Test 2: Multi-step SIP with dividend
const sipSeries = [
  { date: '2023-01-01', amount: -100000 },
  { date: '2023-07-01', amount: -100000 },
  { date: '2024-01-01', amount: 10000 }, // Dividend credit
  { date: '2024-07-01', amount: 230000 }, // Terminal valuation
];
const res2 = calculateXirr(sipSeries);
console.log('Test 2 (SIP + Dividend):', res2);
assert(res2.xirr !== null && res2.xirr > 14 && res2.xirr < 22, `Expected ~18%, got ${res2.xirr}%`);

// Test 3: buildCashflowSeries integration
const mockTransactions: AssetTransaction[] = [
  {
    id: 'tx-1',
    date: '2024-01-15',
    type: 'DEBIT',
    description: 'Initial Purchase',
    grossAmount: 50000,
    netCashflow: -50000,
    status: 'completed',
  },
  {
    id: 'tx-2',
    date: '2024-06-15',
    type: 'CREDIT',
    description: 'Dividend Received',
    grossAmount: 2500,
    netCashflow: 2500,
    status: 'completed',
  },
];
const built = buildCashflowSeries(mockTransactions, 62000, '2025-01-15');
console.log('Test 3 Built Series:', built);
assert(built.length === 3, 'Expected 3 cashflow entries');
assert(built[0].amount === -50000, 'Expected first entry to be -50000 debit');
assert(built[1].amount === 2500, 'Expected second entry to be +2500 credit');
assert(built[2].amount === 62000, 'Expected terminal entry to be +62000 current valuation');

const res3 = calculateXirr(built);
console.log('Test 3 Computed XIRR:', res3);
assert(res3.xirr !== null && res3.xirr > 25 && res3.xirr < 35, `Expected ~29%, got ${res3.xirr}%`);

console.log('\n✅ All XIRR mathematical solver tests passed successfully!');
