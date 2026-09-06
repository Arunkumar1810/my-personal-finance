-- Wealth Orchestrator: Local SQLite Schema Draft

-- 1. Unified Assets Directory
CREATE TABLE IF NOT EXISTS assets (
    id TEXT PRIMARY KEY,
    symbol TEXT NOT NULL,
    name TEXT,
    asset_class TEXT NOT NULL, -- 'indian_equity', 'us_equity', 'bond', 'fd', 'esop'
    is_auto_synced BOOLEAN DEFAULT 0 -- 1 for Swing Trading, 0 for manual CSVs
);

-- 2. Core Transaction Ledger (Supports both CSV & API)
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    asset_id TEXT NOT NULL,
    txn_type TEXT NOT NULL, -- 'buy', 'sell', 'dividend', 'split'
    txn_date DATE NOT NULL,
    quantity REAL NOT NULL,
    price REAL NOT NULL,
    source TEXT NOT NULL, -- 'csv_upload', 'zerodha_api', 'manual_entry'
    import_hash TEXT UNIQUE, -- Prevents duplicate CSV imports
    FOREIGN KEY(asset_id) REFERENCES assets(id)
);

-- 3. Liabilities (For the Action Inbox & Mortgages)
CREATE TABLE IF NOT EXISTS liabilities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    total_amount REAL NOT NULL,
    apr REAL NOT NULL,
    monthly_emi REAL NOT NULL,
    next_due_date DATE,
    autopay_enabled BOOLEAN DEFAULT 0
);

-- 4. Envelope Goals
CREATE TABLE IF NOT EXISTS goals (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    target_amount REAL NOT NULL,
    current_saved REAL DEFAULT 0,
    target_date DATE
);

-- 5. Time-Series Data (Critical for the 200ms Timeline Scrubber)
CREATE TABLE IF NOT EXISTS market_prices (
    asset_id TEXT NOT NULL,
    price_date DATE NOT NULL,
    close_price REAL NOT NULL,
    PRIMARY KEY (asset_id, price_date),
    FOREIGN KEY(asset_id) REFERENCES assets(id)
) WITHOUT ROWID; -- Optimization for faster range scans

