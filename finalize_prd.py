with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/prds/prd-personal-finance-2026-08-23/prd.md', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

content = content.replace('status: draft', 'status: final')

with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/prds/prd-personal-finance-2026-08-23/prd.md', 'w', encoding='utf-8') as f:
    f.write(content)
