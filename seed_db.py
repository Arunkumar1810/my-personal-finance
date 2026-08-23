import sys, json
sys.path.append('backend/swing-trading-service')
from database import get_db_connection
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
print('Seeded!')
