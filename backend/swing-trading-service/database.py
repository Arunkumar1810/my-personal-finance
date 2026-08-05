import os
import sqlite3
import json
from cryptography.fernet import Fernet
from settings import settings

DATABASE_URL = os.path.join(os.path.dirname(__file__), "holdings_cache.db")

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS holdings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS positions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            amount REAL NOT NULL,
            type TEXT NOT NULL
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS broker_credentials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            api_key TEXT NOT NULL,
            api_secret TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS raw_executions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            ticker TEXT NOT NULL,
            side TEXT NOT NULL,
            quantity REAL NOT NULL,
            price REAL NOT NULL,
            timestamp TEXT NOT NULL,
            synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(ticker, side, quantity, price, timestamp)
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS swing_campaigns (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT,
            ticker TEXT NOT NULL,
            status TEXT DEFAULT 'open',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS campaign_executions (
            campaign_id INTEGER,
            execution_id INTEGER,
            PRIMARY KEY (campaign_id, execution_id),
            FOREIGN KEY (campaign_id) REFERENCES swing_campaigns(id),
            FOREIGN KEY (execution_id) REFERENCES raw_executions(id)
        )
    ''')
    # Epic 2: Behavioral fields for swing_campaigns
    new_columns = [
        ("strategy", "TEXT"),
        ("sell_reason", "TEXT"),
        ("emotion", "TEXT"),
        ("regret_metric", "INTEGER"),
        ("rationale", "TEXT")
    ]
    for col_name, col_type in new_columns:
        try:
            cursor.execute(f"ALTER TABLE swing_campaigns ADD COLUMN {col_name} {col_type}")
        except sqlite3.OperationalError:
            pass
            
    conn.commit()
    conn.close()

def save_holdings(holdings_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Delete old cache
    cursor.execute('DELETE FROM holdings')
    cursor.execute('INSERT INTO holdings (data) VALUES (?)', (json.dumps(holdings_data),))
    conn.commit()
    conn.close()

def get_cached_holdings():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT data FROM holdings ORDER BY updated_at DESC LIMIT 1')
    row = cursor.fetchone()
    conn.close()
    if row:
        return json.loads(row['data'])
    return None

def save_positions(positions_data):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM positions')
    cursor.execute('INSERT INTO positions (data) VALUES (?)', (json.dumps(positions_data),))
    conn.commit()
    conn.close()

def get_cached_positions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT data FROM positions ORDER BY updated_at DESC LIMIT 1')
    row = cursor.fetchone()
    conn.close()
    if row:
        return json.loads(row['data'])
    return None

def save_transaction(date, amount, type):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO transactions (date, amount, type) VALUES (?, ?, ?)', (date, amount, type))
    conn.commit()
    conn.close()

def wipe_transactions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM transactions')
    conn.commit()
    conn.close()

def get_transactions():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT id, date, amount, type FROM transactions ORDER BY date ASC')
    rows = cursor.fetchall()
    conn.close()
    return [{"id": row["id"], "date": row["date"], "amount": row["amount"], "type": row["type"]} for row in rows]

def get_fernet():
    if settings.ENCRYPTION_KEY:
        return Fernet(settings.ENCRYPTION_KEY.encode())
    return None

def save_broker_credentials(user_id, api_key, api_secret):
    fernet = get_fernet()
    if fernet:
        api_key = fernet.encrypt(api_key.encode()).decode()
        api_secret = fernet.encrypt(api_secret.encode()).decode()
        
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM broker_credentials WHERE user_id = ?', (user_id,))
    cursor.execute('''
        INSERT INTO broker_credentials (user_id, api_key, api_secret) 
        VALUES (?, ?, ?)
    ''', (user_id, api_key, api_secret))
    conn.commit()
    conn.close()

def get_broker_credentials(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT api_key, api_secret FROM broker_credentials WHERE user_id = ? LIMIT 1', (user_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        api_key, api_secret = row["api_key"], row["api_secret"]
        fernet = get_fernet()
        if fernet:
            try:
                api_key = fernet.decrypt(api_key.encode()).decode()
                api_secret = fernet.decrypt(api_secret.encode()).decode()
            except Exception:
                pass # Return as is if decryption fails (e.g. key changed)
        return {"api_key": api_key, "api_secret": api_secret}
    return None

def save_raw_executions(executions, user_id="default"):
    conn = get_db_connection()
    cursor = conn.cursor()
    count = 0
    for ex in executions:
        try:
            cursor.execute('''
                INSERT INTO raw_executions (user_id, ticker, side, quantity, price, timestamp)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (user_id, ex["ticker"], ex["side"], ex["quantity"], ex["price"], ex["timestamp"]))
            count += 1
        except sqlite3.IntegrityError:
            # Ignore duplicates based on the UNIQUE constraint
            pass
    conn.commit()
    conn.close()
    return count

def get_raw_executions(user_id="default"):
    conn = get_db_connection()
    cursor = conn.cursor()
    # Only get executions not linked to a campaign
    cursor.execute('''
        SELECT r.id, r.ticker, r.side, r.quantity, r.price, r.timestamp, r.synced_at 
        FROM raw_executions r
        LEFT JOIN campaign_executions ce ON r.id = ce.execution_id
        WHERE r.user_id = ? AND ce.campaign_id IS NULL
        ORDER BY r.timestamp DESC
    ''', (user_id,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

def create_swing_campaign(user_id, ticker, execution_ids):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute('''
            INSERT INTO swing_campaigns (user_id, ticker, status)
            VALUES (?, ?, 'open')
        ''', (user_id, ticker))
        campaign_id = cursor.lastrowid
        
        for ex_id in execution_ids:
            cursor.execute('''
                INSERT INTO campaign_executions (campaign_id, execution_id)
                VALUES (?, ?)
            ''', (campaign_id, ex_id))
        
        conn.commit()
        return campaign_id
    except Exception as e:
        conn.rollback()
        raise e
    finally:
        conn.close()

def get_swing_campaigns(user_id="default"):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get campaigns
    cursor.execute('SELECT id, ticker, status, created_at, strategy, sell_reason, emotion, regret_metric, rationale FROM swing_campaigns WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
    campaigns = [dict(row) for row in cursor.fetchall()]
    
    # Calculate aggregation
    for camp in campaigns:
        cursor.execute('''
            SELECT r.side, r.quantity, r.price 
            FROM raw_executions r
            JOIN campaign_executions ce ON r.id = ce.execution_id
            WHERE ce.campaign_id = ?
        ''', (camp["id"],))
        executions = cursor.fetchall()
        
        total_buy_qty = 0
        total_buy_val = 0
        total_sell_qty = 0
        total_sell_val = 0
        
        for ex in executions:
            if ex["side"].upper() == "BUY":
                total_buy_qty += ex["quantity"]
                total_buy_val += ex["quantity"] * ex["price"]
            elif ex["side"].upper() == "SELL":
                total_sell_qty += ex["quantity"]
                total_sell_val += ex["quantity"] * ex["price"]
                
        camp["entry_price"] = total_buy_val / total_buy_qty if total_buy_qty > 0 else 0
        camp["exit_price"] = total_sell_val / total_sell_qty if total_sell_qty > 0 else 0
        camp["realized_pnl"] = total_sell_val - (total_buy_val * (total_sell_qty / total_buy_qty) if total_buy_qty > 0 else 0)
        camp["executions_count"] = len(executions)
        
    conn.close()
    return campaigns

def update_swing_campaign(campaign_id, strategy=None, sell_reason=None, emotion=None, regret_metric=None, rationale=None):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE swing_campaigns
        SET strategy = ?, sell_reason = ?, emotion = ?, regret_metric = ?, rationale = ?
        WHERE id = ?
    ''', (strategy, sell_reason, emotion, regret_metric, rationale, campaign_id))
    conn.commit()
    conn.close()


