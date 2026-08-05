import grpc
from protos import holdings_pb2, holdings_pb2_grpc
from settings import settings
from circuit_breaker import CircuitBreaker, CircuitBreakerOpenException
from database import get_cached_holdings

cb = CircuitBreaker()

class KiteServiceClient:
    def __init__(self):
        endpoint = settings.KITE_GRPC_ENDPOINT or "localhost:50051"
        self.channel = grpc.insecure_channel(endpoint)
        self.stub = holdings_pb2_grpc.KiteServiceStub(self.channel)

    def get_holdings(self):
        request = holdings_pb2.HoldingsRequest()
        try:
            # Task 2.4: Configure the gRPC channel with strict timeouts (e.g., 5 seconds)
            response = cb.call(self.stub.GetHoldings, request, timeout=5.0)
            
            # Convert response back to dictionary list
            holdings = []
            for h in response.holdings:
                holdings.append({
                    "tradingsymbol": h.tradingsymbol,
                    "exchange": h.exchange,
                    "instrument_token": h.instrument_token,
                    "quantity": h.quantity,
                    "average_price": h.average_price,
                    "last_price": h.last_price,
                    "pnl": h.pnl
                })
            return {"holdings": holdings, "fallback": False}
        except (grpc.RpcError, CircuitBreakerOpenException) as e:
            print(f"gRPC call GetHoldings failed or circuit open: {e}. Falling back to SQLite cache.")
            cached = get_cached_holdings()
            if cached is not None:
                return {"holdings": cached, "fallback": True}
            return None

    def get_margins(self):
        request = holdings_pb2.MarginsRequest()
        try:
            response = cb.call(self.stub.GetMargins, request, timeout=5.0)
            return {"available_cash": response.available_cash}
        except (grpc.RpcError, CircuitBreakerOpenException) as e:
            print(f"gRPC call GetMargins failed: {e}")
            return {"available_cash": 0.0}

    def get_cash_transactions(self):
        request = holdings_pb2.CashTransactionsRequest()
        try:
            response = cb.call(self.stub.GetCashTransactions, request, timeout=5.0)
            transactions = []
            for tx in response.transactions:
                transactions.append({
                    "date": tx.date,
                    "amount": tx.amount,
                    "type": tx.type
                })
            return {"transactions": transactions}
        except (grpc.RpcError, CircuitBreakerOpenException) as e:
            print(f"gRPC call GetCashTransactions failed: {e}")
            return {"transactions": []}
