import sqlite3
import os

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "api")
WEALTH_DB_PATH = os.path.join(DB_DIR, "wealth_orchestrator.db")

def get_wealth_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(WEALTH_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
