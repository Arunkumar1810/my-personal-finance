import os
import re

html_path = 'C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/ux-wealth-orchestrator-2026-08-23/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

templates_to_add = []

def add_template(id, content):
    templates_to_add.append(f'<template id="{id}">\n{content}\n</template>\n')

# 1. Indian ETFs Txns
add_template('view-assets-indian-etfs-txns', '''
<div class="max-w-5xl">
    <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Indian ETFs - Transactions</h2>
    </header>
    <table class="w-full text-left border-collapse bg-panel rounded-2xl overflow-hidden shadow-lg border border-bordercol">
        <thead class="bg-bordercol/30">
            <tr class="text-gray-400 text-sm border-b border-bordercol">
                <th class="py-4 px-6 font-medium">Date</th>
                <th class="py-4 px-6 font-medium">Asset</th>
                <th class="py-4 px-6 font-medium">Type</th>
                <th class="py-4 px-6 font-medium text-right">Qty</th>
                <th class="py-4 px-6 font-medium text-right">Price</th>
                <th class="py-4 px-6 font-medium text-right">Amount</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-bordercol font-mono text-sm">
            <tr class="hover:bg-bordercol/20 transition-colors">
                <td class="py-4 px-6 text-gray-400">2026-08-15</td>
                <td class="py-4 px-6 text-white">NIFTYBEES</td>
                <td class="py-4 px-6 text-green-400">BUY</td>
                <td class="py-4 px-6 text-right">100</td>
                <td class="py-4 px-6 text-right">?245.50</td>
                <td class="py-4 px-6 text-right">?24,550.00</td>
            </tr>
            <tr class="hover:bg-bordercol/20 transition-colors">
                <td class="py-4 px-6 text-gray-400">2026-07-02</td>
                <td class="py-4 px-6 text-white">MON100</td>
                <td class="py-4 px-6 text-green-400">BUY</td>
                <td class="py-4 px-6 text-right">50</td>
                <td class="py-4 px-6 text-right">?130.00</td>
                <td class="py-4 px-6 text-right">?6,500.00</td>
            </tr>
        </tbody>
    </table>
</div>
''')

# 2. Indian LT Stocks Txns
add_template('view-assets-indian-lt-stocks-txns', '''
<div class="max-w-5xl">
    <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Long-Term Stocks - Transactions</h2>
    </header>
    <table class="w-full text-left border-collapse bg-panel rounded-2xl overflow-hidden shadow-lg border border-bordercol">
        <thead class="bg-bordercol/30">
            <tr class="text-gray-400 text-sm border-b border-bordercol">
                <th class="py-4 px-6 font-medium">Date</th>
                <th class="py-4 px-6 font-medium">Asset</th>
                <th class="py-4 px-6 font-medium">Type</th>
                <th class="py-4 px-6 font-medium text-right">Qty</th>
                <th class="py-4 px-6 font-medium text-right">Price</th>
                <th class="py-4 px-6 font-medium text-right">Amount</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-bordercol font-mono text-sm">
            <tr class="hover:bg-bordercol/20 transition-colors">
                <td class="py-4 px-6 text-gray-400">2026-08-10</td>
                <td class="py-4 px-6 text-white">RELIANCE</td>
                <td class="py-4 px-6 text-green-400">BUY</td>
                <td class="py-4 px-6 text-right">10</td>
                <td class="py-4 px-6 text-right">?2,450.00</td>
                <td class="py-4 px-6 text-right">?24,500.00</td>
            </tr>
        </tbody>
    </table>
</div>
''')

# 3. US Stocks Txns
add_template('view-assets-us-stocks-txns', '''
<div class="max-w-5xl">
    <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">US Stocks & ETFs - Transactions</h2>
    </header>
    <table class="w-full text-left border-collapse bg-panel rounded-2xl overflow-hidden shadow-lg border border-bordercol">
        <thead class="bg-bordercol/30">
            <tr class="text-gray-400 text-sm border-b border-bordercol">
                <th class="py-4 px-6 font-medium">Date</th>
                <th class="py-4 px-6 font-medium">Asset</th>
                <th class="py-4 px-6 font-medium">Type</th>
                <th class="py-4 px-6 font-medium text-right">Qty</th>
                <th class="py-4 px-6 font-medium text-right">Price</th>
                <th class="py-4 px-6 font-medium text-right">Amount</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-bordercol font-mono text-sm">
            <tr class="hover:bg-bordercol/20 transition-colors">
                <td class="py-4 px-6 text-gray-400">2026-05-12</td>
                <td class="py-4 px-6 text-white">AAPL</td>
                <td class="py-4 px-6 text-green-400">BUY</td>
                <td class="py-4 px-6 text-right">5</td>
                <td class="py-4 px-6 text-right">.00</td>
                <td class="py-4 px-6 text-right">.00</td>
            </tr>
        </tbody>
    </table>
</div>
''')

# 4. ESOPs Grants
add_template('view-assets-esops-grants', '''
<div class="max-w-5xl">
    <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">ESOPs - Grants</h2>
    </header>
    <div class="space-y-4">
        <div class="bg-panel border border-bordercol p-6 rounded-2xl">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-white">Grant #2023-A</h3>
                <span class="px-3 py-1 bg-sky-500/10 text-sky-400 text-xs rounded border border-sky-500/20">Vesting Active</span>
            </div>
            <div class="grid grid-cols-4 gap-4 text-sm">
                <div><span class="block text-gray-500 mb-1">Grant Date</span><span class="font-mono text-white">Oct 1, 2023</span></div>
                <div><span class="block text-gray-500 mb-1">Total Options</span><span class="font-mono text-white">10,000</span></div>
                <div><span class="block text-gray-500 mb-1">Vested</span><span class="font-mono text-green-400">2,500</span></div>
                <div><span class="block text-gray-500 mb-1">Unvested</span><span class="font-mono text-white">7,500</span></div>
            </div>
        </div>
    </div>
</div>
''')

# 5. FDs Matured
add_template('view-assets-fixed-deposits-matured', '''
<div class="max-w-5xl">
    <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Fixed Deposits - Matured</h2>
    </header>
    <table class="w-full text-left border-collapse bg-panel rounded-2xl overflow-hidden shadow-lg border border-bordercol">
        <thead class="bg-bordercol/30">
            <tr class="text-gray-400 text-sm border-b border-bordercol">
                <th class="py-4 px-6 font-medium">Bank</th>
                <th class="py-4 px-6 font-medium">Maturity Date</th>
                <th class="py-4 px-6 font-medium text-right">Principal</th>
                <th class="py-4 px-6 font-medium text-right">Interest</th>
                <th class="py-4 px-6 font-medium text-right">Total Payout</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-bordercol font-mono text-sm">
            <tr class="hover:bg-bordercol/20 transition-colors opacity-70">
                <td class="py-4 px-6 text-white font-sans">HDFC Bank</td>
                <td class="py-4 px-6 text-gray-400">2025-12-01</td>
                <td class="py-4 px-6 text-right text-gray-300">?1,00,000</td>
                <td class="py-4 px-6 text-right text-green-400">+?14,000</td>
                <td class="py-4 px-6 text-right text-white">?1,14,000</td>
            </tr>
        </tbody>
    </table>
</div>
''')

# 6. Indian Bonds Txns
add_template('view-assets-indian-bonds-txns', '''
<div class="max-w-5xl">
    <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">Indian Bonds - Transactions</h2>
    </header>
    <div class="bg-panel border border-bordercol p-12 rounded-2xl text-center">
        <p class="text-gray-500">No transactions recorded yet.</p>
    </div>
</div>
''')

# 7. PF Account Analytics
add_template('view-assets-pf-account-analytics', '''
<div class="max-w-5xl">
    <header class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold">PF Account - Analytics</h2>
    </header>
    <div class="grid grid-cols-2 gap-6">
        <div class="bg-panel border border-bordercol p-6 rounded-2xl">
            <h3 class="text-gray-400 text-sm mb-4">Contribution Growth</h3>
            <!-- Faux chart lines -->
            <div class="h-48 relative overflow-hidden flex items-end justify-between px-2">
                <div class="w-8 bg-sky-500/20 h-1/6 rounded-t hover:bg-sky-500/40 transition-colors"></div>
                <div class="w-8 bg-sky-500/20 h-2/6 rounded-t hover:bg-sky-500/40 transition-colors"></div>
                <div class="w-8 bg-sky-500/30 h-3/6 rounded-t hover:bg-sky-500/50 transition-colors"></div>
                <div class="w-8 bg-sky-500/40 h-4/6 rounded-t hover:bg-sky-500/60 transition-colors"></div>
                <div class="w-8 bg-sky-500/50 h-5/6 rounded-t hover:bg-sky-500/70 transition-colors"></div>
                <div class="w-8 bg-sky-500 h-full rounded-t hover:bg-sky-400 transition-colors"></div>
            </div>
        </div>
        <div class="bg-panel border border-bordercol p-6 rounded-2xl flex items-center justify-center">
             <div class="text-center">
                <div class="text-4xl font-mono text-white mb-2">8.15%</div>
                <div class="text-sm text-gray-500 uppercase tracking-widest">Current Interest Rate</div>
             </div>
        </div>
    </div>
</div>
''')

all_templates_str = '\n'.join(templates_to_add)
content = content.replace('</body>', all_templates_str + '\n</body>')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)
