import time
import grpc
import logging

logger = logging.getLogger(__name__)

class CircuitBreakerOpenException(Exception):
    pass

class CircuitBreaker:
    def __init__(self, failure_threshold=3, reset_timeout=30):
        self.failure_threshold = failure_threshold
        self.reset_timeout = reset_timeout
        self.failures = 0
        self.state = "CLOSED"
        self.last_failure_time = None

    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.reset_timeout:
                logger.info("Circuit breaker transitioning to HALF_OPEN")
                self.state = "HALF_OPEN"
            else:
                raise CircuitBreakerOpenException("Circuit breaker is OPEN")

        try:
            result = func(*args, **kwargs)
            if self.state == "HALF_OPEN":
                logger.info("Circuit breaker transitioning to CLOSED")
                self.state = "CLOSED"
                self.failures = 0
            return result
        except grpc.RpcError as e:
            if e.code() in (grpc.StatusCode.UNAVAILABLE, grpc.StatusCode.RESOURCE_EXHAUSTED):
                self.failures += 1
                self.last_failure_time = time.time()
                logger.warning(f"Circuit breaker recorded failure {self.failures}/{self.failure_threshold}. Error: {e.code()}")
                if self.failures >= self.failure_threshold:
                    logger.error("Circuit breaker transitioning to OPEN")
                    self.state = "OPEN"
            raise
