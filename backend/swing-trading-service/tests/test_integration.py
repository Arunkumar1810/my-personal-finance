import sys
import os
import pytest
from unittest.mock import patch, MagicMock
import grpc

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from kite_service_client import KiteServiceClient
from circuit_breaker import CircuitBreakerOpenException
import database

class MockRpcError(grpc.RpcError):
    def __init__(self, code):
        self._code = code
    def code(self):
        return self._code

def test_kite_service_client_fallback(monkeypatch):
    # Mock the database response
    mock_holdings = [{"tradingsymbol": "AAPL", "quantity": 10}]
    monkeypatch.setattr("kite_service_client.get_cached_holdings", lambda: mock_holdings)
    
    client = KiteServiceClient()
    
    # Mock the grpc stub to always fail with UNAVAILABLE
    def mock_get_holdings(*args, **kwargs):
        raise MockRpcError(grpc.StatusCode.UNAVAILABLE)
    
    client.stub.GetHoldings = mock_get_holdings
    
    # 1. Test immediate failure triggers fallback
    res1 = client.get_holdings()
    assert res1 is not None
    assert res1["fallback"] is True
    assert res1["holdings"] == mock_holdings
    
    # 2. Test circuit breaker tripping after 3 failures
    # the client has already failed 1 time.
    client.get_holdings() # 2
    client.get_holdings() # 3
    
    # 3. Next call should immediately raise CircuitBreakerOpenException in CircuitBreaker,
    # but KiteServiceClient catches it and returns fallback
    res4 = client.get_holdings()
    assert res4 is not None
    assert res4["fallback"] is True
    assert res4["holdings"] == mock_holdings
