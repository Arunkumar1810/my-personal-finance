from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import grpc
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), 'swing-trading-service'))
from protos import holdings_pb2

# Need to import app after setting sys.path
from main import app

client = TestClient(app)

def test_proxy_routing_success():
    """Test 3.1: Unit test for reverse proxy routing logic returning successful response"""
    mock_response = holdings_pb2.HoldingsResponse()
    holding = mock_response.holdings.add()
    holding.tradingsymbol = "RELIANCE"
    holding.exchange = "NSE"
    holding.instrument_token = "123456"
    holding.quantity = 10
    holding.average_price = 2500.0
    holding.last_price = 2600.0
    holding.pnl = 1000.0

    with patch('main.get_grpc_stub') as mock_get_stub:
        mock_stub = MagicMock()
        mock_stub.GetHoldings.return_value = mock_response
        mock_get_stub.return_value = mock_stub
        
        response = client.get("/api/holdings")
        assert response.status_code == 200
        data = response.json()
        assert "holdings" in data
        assert len(data["holdings"]) == 1
        assert data["holdings"][0]["tradingsymbol"] == "RELIANCE"
        
        # Verify stub was called with timeout 5.0
        mock_stub.GetHoldings.assert_called_once()
        _, kwargs = mock_stub.GetHoldings.call_args
        assert kwargs.get('timeout') == 5.0

def test_proxy_timeout():
    """Test 3.2: Verify the 5-second timeout returns HTTP 504"""
    with patch('main.get_grpc_stub') as mock_get_stub:
        mock_stub = MagicMock()
        
        # Create a mock RpcError with DEADLINE_EXCEEDED code
        class MockRpcError(grpc.RpcError):
            def code(self):
                return grpc.StatusCode.DEADLINE_EXCEEDED
            def details(self):
                return "Deadline Exceeded"

        mock_stub.GetHoldings.side_effect = MockRpcError()
        mock_get_stub.return_value = mock_stub
        
        response = client.get("/api/holdings")
        assert response.status_code == 504
        assert "Gateway Timeout" in response.json()["detail"]

def test_proxy_other_error():
    """Test handling of other gRPC errors (e.g. UNAVAILABLE) -> 502 Bad Gateway"""
    with patch('main.get_grpc_stub') as mock_get_stub:
        mock_stub = MagicMock()
        
        class MockRpcError(grpc.RpcError):
            def code(self):
                return grpc.StatusCode.UNAVAILABLE
            def details(self):
                return "Service Unavailable"

        mock_stub.GetHoldings.side_effect = MockRpcError()
        mock_get_stub.return_value = mock_stub
        
        response = client.get("/api/holdings")
        assert response.status_code == 502
        assert "Bad Gateway" in response.json()["detail"]

