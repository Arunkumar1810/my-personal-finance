from abc import ABC, abstractmethod
from typing import Any, Dict, List

class IKiteAdapter(ABC):
    """
    Base interface for the Kite Service Adapter.
    Defines the contract for fetching data from Kite API.
    """
    
    @abstractmethod
    def holdings(self) -> List[Dict[str, Any]]:
        pass
        
    @abstractmethod
    def positions(self) -> Dict[str, Any]:
        pass
        
    @abstractmethod
    def get_gtts(self) -> List[Dict[str, Any]]:
        pass
        
    @abstractmethod
    def historical_data(self, instrument_token: int, from_date: str, to_date: str, interval: str) -> List[Dict[str, Any]]:
        pass
