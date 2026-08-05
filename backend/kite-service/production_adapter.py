from typing import Any, Dict, List
import time
from i_kite_adapter import IKiteAdapter

class ProductionKiteAdapter(IKiteAdapter):
    """
    Production implementation that routes requests to the live Kite API.
    """
    
    def __init__(self, kite_client):
        """
        :param kite_client: An initialized instance of kiteconnect.KiteConnect
        """
        self._kite = kite_client
        
    def holdings(self) -> List[Dict[str, Any]]:
        return self._kite.holdings()
        
    def positions(self) -> Dict[str, Any]:
        return self._kite.positions()
        
    def get_gtts(self) -> List[Dict[str, Any]]:
        return self._kite.get_gtts()
        
    def historical_data(self, instrument_token: int, from_date: str, to_date: str, interval: str) -> List[Dict[str, Any]]:
        return self._kite.historical_data(instrument_token, from_date, to_date, interval)

    def margins(self) -> Dict[str, Any]:
        return self._kite.margins()

    def get_cash_transactions(self) -> List[Dict[str, Any]]:
        # Note: Kite Connect API currently does not support fetching historical cash deposits and withdrawals.
        # This would either require Console API parsing or manual entry.
        return []

