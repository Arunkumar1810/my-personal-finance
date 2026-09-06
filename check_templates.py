import os
import re

html_path = 'C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/ux-wealth-orchestrator-2026-08-23/index.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

tabs = [
    'view-dashboard', 'view-eagle-view', 'view-valuation', 'view-liabilities', 'view-goals',
    'view-assets-dashboard',
    'view-assets-indian-etfs-holdings', 'view-assets-indian-etfs-txns',
    'view-assets-indian-lt-stocks-holdings', 'view-assets-indian-lt-stocks-txns',
    'view-assets-us-stocks-holdings', 'view-assets-us-stocks-txns',
    'view-assets-esops-vesting', 'view-assets-esops-grants',
    'view-assets-fixed-deposits-active', 'view-assets-fixed-deposits-matured',
    'view-assets-indian-bonds-holdings', 'view-assets-indian-bonds-txns',
    'view-assets-pf-account-ledger', 'view-assets-pf-account-analytics',
    'view-assets-indian-swing', 'view-assets-gtt-orders', 'view-assets-watchlist', 'view-assets-history', 'view-assets-broker-sync'
]

missing = []
for t in tabs:
    if f'id="{t}"' not in content:
        missing.append(t)

if missing:
    print("Missing templates:", missing)
else:
    print("All templates are present!")
