with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/prds/prd-personal-finance-2026-08-23/prd.md', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

old_di = '*   **Data Integration:** [ASSUMPTION] Requires integrations with India Account Aggregator (AA) for banking/FDs, and broker APIs (Zerodha/Upstox) for Swing Trading/GTT orders.'
new_di = '*   **Data Integration:** Relies on manual CSV uploads and manual data entry for all asset classes (Equities, FDs, Bonds, PF, etc.) EXCEPT for the Swing Trading module, which utilizes direct broker API integrations.'
content = content.replace(old_di, new_di)

old_ps = '*   **Privacy & Security:** [ASSUMPTION] Financial data must be end-to-end encrypted or stored locally (local-first architecture).'
new_ps = '*   **Privacy & Security:** Built as a local desktop application. All financial data is stored securely on the users local machine, guaranteeing absolute privacy without cloud dependency.'
content = content.replace(old_ps, new_ps)

with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/prds/prd-personal-finance-2026-08-23/prd.md', 'w', encoding='utf-8') as f:
    f.write(content)
