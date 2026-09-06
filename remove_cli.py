import re

# Update PRD
with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/prds/prd-personal-finance-2026-08-23/prd.md', 'r', encoding='utf-8', errors='ignore') as f:
    prd_content = f.read()

# Remove 3.2 section
prd_content = re.sub(r'### 3\.2\. Global Command Interface \(CLI\).*?(?=### 3\.3)', '', prd_content, flags=re.DOTALL)
# Fix numbering
prd_content = prd_content.replace('### 3.3. Asset-Specific Valuation Dashboards', '### 3.2. Asset-Specific Valuation Dashboards')
prd_content = prd_content.replace('### 3.4. Liquidity & Liability Management', '### 3.3. Liquidity & Liability Management')
prd_content = prd_content.replace('### 3.5. Predictive Scrubber & Stress Testing', '### 3.4. Predictive Scrubber & Stress Testing')

# Remove from User Journey
prd_content = re.sub(r'3\.  AK hits \[?K\] and types "Transfer \,500 from Swing Trading to Checking"\.\n4\.  The system stages the broker withdrawal\. The Inbox clears the EMI alert\.', '3.  AK clicks the "Move Cash Now" button on the alert.\n4.  The system stages the broker withdrawal transfer. The Inbox clears the EMI alert.', prd_content)

# Remove from Success Metrics
prd_content = re.sub(r'\*   \*\*CLI Adoption:\*\* % of daily active users utilizing the.+?\n', '', prd_content)

with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/prds/prd-personal-finance-2026-08-23/prd.md', 'w', encoding='utf-8') as f:
    f.write(prd_content)

# Update index.html
with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/ux-wealth-orchestrator-2026-08-23/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Remove the command bar div
cli_div = '''<div class="relative hidden md:block group">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold group-hover:text-sky-400">?K</span>
                <input type="text" placeholder="Deploy 1L to NIFTYBEES..." class="bg-[#0D0D12] text-sm rounded-lg pl-10 pr-4 py-2 border border-bordercol focus:outline-none focus:border-sky-500 w-80 text-white transition-colors shadow-inner shadow-black/50">
            </div>'''
html_content = html_content.replace(cli_div, '')

with open('C:/ak/MyRepo/personal-finance/_bmad-output/planning-artifacts/ux-wealth-orchestrator-2026-08-23/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
