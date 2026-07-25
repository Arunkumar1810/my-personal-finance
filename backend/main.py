import os
import sys
import logging
import gspread
from google.oauth2.service_account import Credentials

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def get_sheets_client():
    scopes = [
        "https://www.googleapis.com/auth/spreadsheets"
    ]
    
    creds_path = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS")
    if not creds_path or not os.path.exists(creds_path):
        logging.error("GOOGLE_APPLICATION_CREDENTIALS environment variable not set or file does not exist.")
        sys.exit(1)
        
    try:
        credentials = Credentials.from_service_account_file(creds_path, scopes=scopes)
        client = gspread.authorize(credentials)
        logging.info("Successfully authenticated with Google Sheets API.")
        return client
    except Exception as e:
        logging.error(f"Failed to authenticate with Google Sheets API: {e}")
        sys.exit(1)

def main():
    client = get_sheets_client()
    
    spreadsheet_id = os.environ.get("SPREADSHEET_ID")
    if not spreadsheet_id:
        logging.error("SPREADSHEET_ID environment variable not set.")
        sys.exit(1)
        
    try:
        logging.info(f"Connecting to spreadsheet ID: {spreadsheet_id}")
        sheet = client.open_by_key(spreadsheet_id)
        logging.info("Successfully opened the target spreadsheet.")
    except Exception as e:
        logging.error(f"Failed to open spreadsheet: {e}")
        sys.exit(1)
        
    try:
        # Read from 'Pending Watchlist' sheet
        pending_sheet = sheet.worksheet("Pending Watchlist")
        # Assuming tickers are in column A
        tickers = pending_sheet.col_values(1)
        logging.info(f"Successfully read tickers from 'Pending Watchlist': {tickers}")
        
        # Write test/debug string to a specific cell
        # Using Z1 as a debug cell for example
        pending_sheet.update_acell('Z1', 'Debug write successful')
        logging.info("Successfully wrote test/debug string to cell Z1.")
        
    except Exception as e:
        logging.error(f"Failed during read/write operations: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
