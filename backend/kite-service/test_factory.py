import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException
from .factory import get_kite_adapter
from .dev_adapter import DevModeKiteAdapter
from .production_adapter import ProductionKiteAdapter

class MockRequest:
    def __init__(self, headers):
        self.headers = headers

@patch('adapters.kite.factory.authenticate_kite')
def test_get_kite_adapter_dev_mode(mock_auth):
    request = MockRequest(headers={"X-Dev-Mode": "true"})
    adapter = get_kite_adapter(request)
    
    assert isinstance(adapter, DevModeKiteAdapter)
    mock_auth.assert_not_called()
    
    holdings = adapter.holdings()
    assert len(holdings) > 0
    assert holdings[0]["tradingsymbol"] == "RELIANCE"

@patch('adapters.kite.factory.authenticate_kite')
def test_get_kite_adapter_production(mock_auth):
    # Mock successful authentication
    mock_kite = MagicMock()
    mock_auth.return_value = mock_kite
    
    request = MockRequest(headers={})
    adapter = get_kite_adapter(request)
    
    assert isinstance(adapter, ProductionKiteAdapter)
    mock_auth.assert_called_once()
    assert adapter._kite == mock_kite

@patch('adapters.kite.factory.authenticate_kite')
def test_get_kite_adapter_production_failure(mock_auth):
    # Mock failed authentication
    mock_auth.return_value = None
    
    request = MockRequest(headers={"X-Dev-Mode": "false"})
    
    with pytest.raises(HTTPException) as exc_info:
        get_kite_adapter(request)
        
    assert exc_info.value.status_code == 500
    assert exc_info.value.detail == "Failed to initialize Kite Production Adapter"
