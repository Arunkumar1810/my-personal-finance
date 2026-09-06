import sys, json
import os
import sqlite3

sys.path.append('backend/swing-trading-service')
from database import get_db_connection

# Seed Swing Trading Schema
conn = get_db_connection()
c = conn.cursor()
c.execute('DELETE FROM campaign_executions')
c.execute('DELETE FROM swing_campaigns')
c.execute('DELETE FROM raw_executions')

c.execute("INSERT INTO raw_executions (id, user_id, ticker, side, quantity, price, timestamp) VALUES (1, 'default', 'RELIANCE', 'BUY', 10, 2500, '2026-08-01T10:00:00')")
c.execute("INSERT INTO raw_executions (id, user_id, ticker, side, quantity, price, timestamp) VALUES (2, 'default', 'RELIANCE', 'SELL', 10, 2400, '2026-08-05T10:00:00')")
c.execute("INSERT INTO raw_executions (id, user_id, ticker, side, quantity, price, timestamp) VALUES (3, 'default', 'TCS', 'BUY', 5, 3000, '2026-08-05T11:00:00')")
c.execute("INSERT INTO raw_executions (id, user_id, ticker, side, quantity, price, timestamp) VALUES (4, 'default', 'HDFC', 'BUY', 100, 1500, '2026-08-05T12:00:00')")

# Closed campaign matching the revenge trade rule (closed today, loss)
c.execute("INSERT INTO swing_campaigns (id, user_id, ticker, status, created_at, strategy, sell_reason, emotion, regret_metric, rationale, planned_risk, planned_reward) VALUES (1, 'default', 'RELIANCE', 'closed', '2026-08-05 10:00:00', 'Breakout', 'Panic Sell', 'Fearful', 4, 'Broke support, panicked.', 500, 1500)")
c.execute("INSERT INTO campaign_executions (campaign_id, execution_id) VALUES (1, 1), (1, 2)")

# Open campaign
c.execute("INSERT INTO swing_campaigns (id, user_id, ticker, status, created_at, planned_risk, planned_reward) VALUES (2, 'default', 'TCS', 'open', '2026-08-05 11:00:00', 300, 900)")
c.execute("INSERT INTO campaign_executions (campaign_id, execution_id) VALUES (2, 3)")

conn.commit()
conn.close()

# Seed Wealth Orchestrator Schema
wo_db_path = os.path.join(os.path.dirname(__file__), 'backend/api/wealth_orchestrator.db')
wo_conn = sqlite3.connect(wo_db_path)
wo_c = wo_conn.cursor()

wo_c.execute('DROP TABLE IF EXISTS assets')
wo_c.execute('DROP TABLE IF EXISTS transactions')
wo_c.execute('DROP TABLE IF EXISTS liabilities')
wo_c.execute('DROP TABLE IF EXISTS goals')
wo_c.execute('DROP TABLE IF EXISTS market_prices')

with open('backend/db/schema.sql', 'r') as f:
    wo_c.executescript(f.read())

wo_c.execute("INSERT INTO assets (id, symbol, name, asset_class, is_auto_synced) VALUES ('A1', 'RELIANCE', 'Reliance Industries', 'indian_equity', 0)")
wo_c.execute("INSERT INTO assets (id, symbol, name, asset_class, is_auto_synced) VALUES ('A2', 'AAPL', 'Apple Inc', 'us_equity', 0)")

wo_c.execute("INSERT INTO transactions (id, asset_id, txn_type, txn_date, quantity, price, source, import_hash) VALUES ('T1', 'A1', 'buy', '2025-01-01', 50, 2000, 'manual_entry', 'hash1')")
wo_c.execute("INSERT INTO transactions (id, asset_id, txn_type, txn_date, quantity, price, source, import_hash) VALUES ('T2', 'A2', 'buy', '2025-02-01', 10, 150, 'manual_entry', 'hash2')")

wo_c.execute("INSERT INTO liabilities (id, name, total_amount, apr, monthly_emi, next_due_date, autopay_enabled) VALUES ('L1', 'Home Mortgage', 50000, 8.5, 1200, '2026-08-27', 0)")
wo_c.execute("INSERT INTO liabilities (id, name, total_amount, apr, monthly_emi, next_due_date, autopay_enabled) VALUES ('L2', 'Credit Card', 2500, 24.0, 200, '2026-09-01', 1)")

wo_c.execute("INSERT INTO goals (id, name, target_amount, current_saved, target_date) VALUES ('G1', 'Emergency Fund', 30000, 20000, '2027-01-01')")
wo_c.execute("INSERT INTO goals (id, name, target_amount, current_saved, target_date) VALUES ('G2', 'Europe Vacation', 10000, 4000, '2027-05-01')")

wo_c.execute("INSERT INTO market_prices (asset_id, price_date, close_price) VALUES ('A1', '2026-08-23', 2950.0)")
wo_c.execute("INSERT INTO market_prices (asset_id, price_date, close_price) VALUES ('A2', '2026-08-23', 180.0)")

wo_conn.commit()
wo_conn.close()
print('Seeded!')
