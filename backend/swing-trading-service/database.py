import sqlite3
import json

DATABASE_URL = "holdings_cache.db"

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
