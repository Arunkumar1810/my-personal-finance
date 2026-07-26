import grpc
from protos import holdings_pb2, holdings_pb2_grpc
from settings import settings

class KiteServiceClient:
    def __init__(self):
        endpoint = settings.KITE_GRPC_ENDPOINT or "localhost:50051"
        self.channel = grpc.insecure_channel(endpoint)
        self.stub = holdings_pb2_grpc.KiteServiceStub(self.channel)

    def get_holdings(self):
        request = holdings_pb2.HoldingsRequest()
        try:
            # Task 2.4: Configure the gRPC channel with strict timeouts (e.g., 5 seconds)
            response = self.stub.GetHoldings(request, timeout=5.0)
            
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
            return holdings
        except grpc.RpcError as e:
            print(f"gRPC call GetHoldings failed: {e}")
            return None
