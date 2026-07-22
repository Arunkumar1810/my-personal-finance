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
