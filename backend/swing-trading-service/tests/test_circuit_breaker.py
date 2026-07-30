import sys
import os
import time
import grpc
import pytest

# Add parent to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from circuit_breaker import CircuitBreaker, CircuitBreakerOpenException

class MockRpcError(grpc.RpcError):
    def __init__(self, code):
        self._code = code
    def code(self):
        return self._code

def test_circuit_breaker_success():
    cb = CircuitBreaker(failure_threshold=2, reset_timeout=1)
    
    def success_call():
        return "ok"
        
    assert cb.call(success_call) == "ok"
    assert cb.state == "CLOSED"

def test_circuit_breaker_tripping():
    cb = CircuitBreaker(failure_threshold=2, reset_timeout=1)
    
    def failing_call():
        raise MockRpcError(grpc.StatusCode.UNAVAILABLE)
        
    with pytest.raises(MockRpcError):
        cb.call(failing_call)
    
    assert cb.state == "CLOSED" # 1 failure, threshold is 2
    
    with pytest.raises(MockRpcError):
        cb.call(failing_call)
        
    assert cb.state == "OPEN" # 2 failures, trips

def test_circuit_breaker_half_open_and_reset():
    cb = CircuitBreaker(failure_threshold=1, reset_timeout=0.1)
    
    def failing_call():
        raise MockRpcError(grpc.StatusCode.UNAVAILABLE)
        
    with pytest.raises(MockRpcError):
        cb.call(failing_call)
        
    assert cb.state == "OPEN"
    
    # Wait for reset timeout
    time.sleep(0.2)
    
    def success_call():
        return "recovered"
        
    # First call after timeout transitions to HALF_OPEN then CLOSED
    assert cb.call(success_call) == "recovered"
    assert cb.state == "CLOSED"

def test_circuit_breaker_ignores_other_errors():
    cb = CircuitBreaker(failure_threshold=1, reset_timeout=1)
    
    def other_error_call():
        raise MockRpcError(grpc.StatusCode.INVALID_ARGUMENT)
        
    with pytest.raises(MockRpcError):
        cb.call(other_error_call)
        
    # Should not trip
    assert cb.state == "CLOSED"
