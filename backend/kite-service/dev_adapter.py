from typing import Any, Dict, List
from .i_kite_adapter import IKiteAdapter

class DevModeKiteAdapter(IKiteAdapter):
    """
    Dev Mode Emulator that returns deterministic mock data 
    without making any external network calls to the real Kite API.
    """
    
    MOCK_HOLDINGS = [
        {
            "tradingsymbol": "RELIANCE",
            "exchange": "NSE",
            "instrument_token": 738561,
            "isin": "INE002A01018",
            "product": "CNC",
            "price": 2500.0,
            "quantity": 10,
            "t1_quantity": 0,
            "realised_quantity": 10,
            "authorised_quantity": 10,
            "opening_quantity": 10,
            "short_quantity": 0,
            "collateral_quantity": 0,
            "collateral_type": "",
            "discrepancy": False,
            "average_price": 2400.0,
            "last_price": 2500.0,
            "close_price": 2450.0,
            "pnl": 1000.0,
            "day_change": 50.0,
            "day_change_percentage": 2.04
        }
    ]
    
    MOCK_POSITIONS = {
        "net": [],
        "day": []
    }
    
    MOCK_GTTS = [
        {
            "id": 123456,
            "condition": {
                "exchange": "NSE",
                "tradingsymbol": "RELIANCE",
                "trigger_values": [2600.0],
                "last_price": 2500.0
            },
            "type": "single",
            "status": "active",
            "orders": [
                {
                    "exchange": "NSE",
                    "tradingsymbol": "RELIANCE",
                    "product": "CNC",
                    "order_type": "LIMIT",
                    "transaction_type": "SELL",
                    "quantity": 10,
                    "price": 2600.0
                }
            ]
        }
    ]

    def holdings(self) -> List[Dict[str, Any]]:
        return self.MOCK_HOLDINGS
        
    def positions(self) -> Dict[str, Any]:
        return self.MOCK_POSITIONS
        
    def get_gtts(self) -> List[Dict[str, Any]]:
        return self.MOCK_GTTS
        
    def historical_data(self, instrument_token: int, from_date: str, to_date: str, interval: str) -> List[Dict[str, Any]]:
        # Mocking 15 days of historical data for ATR calculations
        return [
            {
                "date": f"2023-10-{i:02d}T00:00:00+0530",
                "open": 2400.0,
                "high": 2500.0,
                "low": 2350.0,
                "close": 2450.0,
                "volume": 100000
            }
            for i in range(1, 16)
        ]
