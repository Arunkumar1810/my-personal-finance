import os
import sys
import logging
import time
import json
import schedule
from fasteners import InterProcessLock

from main import get_sheets_client
from moneycontrol_scraper import fetch_moneycontrol_data
from gemini_parser import parse_market_data_with_gemini

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def process_ticker(ticker: str):
    logger.info(f"Processing ticker {ticker}")
    # Fetch data from moneycontrol
    mc_data = fetch_moneycontrol_data(ticker)
    if "error" in mc_data:
        logger.error(f"Failed to fetch market data for {ticker}: {mc_data['error']}")
        raise Exception(f"Moneycontrol error: {mc_data['error']}")

    # Create string payload for Gemini
    raw_data = json.dumps(mc_data)
    gemini_data = parse_market_data_with_gemini(raw_data)
    if "error" in gemini_data:
        logger.error(f"Failed to parse data with Gemini for {ticker}: {gemini_data['error']}")
        raise Exception(f"Gemini error: {gemini_data['error']}")

    # Merge payloads
    mc_data.update(gemini_data)
    return mc_data

def sync_job():
    lock = InterProcessLock('sync_runner.lock')
    if not lock.acquire(blocking=False):
        logger.info("Another instance of sync_job is already running. Skipping this cycle.")
        return

    try:
        client = get_sheets_client()
        spreadsheet_id = os.environ.get("SPREADSHEET_ID")
        if not spreadsheet_id:
            logger.error("SPREADSHEET_ID environment variable not set.")
            return

        sheet = client.open_by_key(spreadsheet_id)
        pending_sheet = sheet.worksheet("Pending Watchlist")
        
        # Get all values from the sheet
        all_rows = pending_sheet.get_all_values()
        
        for idx, row in enumerate(all_rows):
            if idx == 0:
                continue # Skip header
                
            ticker = row[0] if len(row) > 0 else None
            status = row[1] if len(row) > 1 else None
            
            if ticker and status == "Awaiting 15-min Sync":
                try:
                    payload = process_ticker(ticker)
                    # Update status to Active and save payload
                    row_num = idx + 1
                    # A list of cell updates could be faster, but let's just do two separate calls or one range call.
                    # Column B is Status, Column C is Payload
                    pending_sheet.update(f'B{row_num}:C{row_num}', [['Active', json.dumps(payload)]])
                    time.sleep(1) # Sleep to avoid rate limits
                except Exception as e:
                    logger.error(f"Error processing {ticker}: {e}")
                    row_num = idx + 1
                    pending_sheet.update_acell(f'B{row_num}', 'SYNC_FAILED')
    except Exception as e:
        logger.error(f"Failed during sync job: {e}")
    finally:
        lock.release()

if __name__ == "__main__":
    logger.info("Starting sync runner...")
    schedule.every(15).minutes.do(sync_job)
    
    # Run once immediately on startup
    sync_job()
    
    while True:
        schedule.run_pending()
        time.sleep(1)
