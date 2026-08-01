import grpc
import sys
import os
import time
from concurrent import futures
from dotenv import load_dotenv

# Load env variables BEFORE importing other modules so settings.py picks them up
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'swing-trading-service'))
from protos import holdings_pb2, holdings_pb2_grpc
from .factory import get_kite_adapter

class DummyRequest:
    class Headers:
        def get(self, key, default=None):
            # Not sending X-Dev-Mode ensures we use the Production adapter
            return default
    def __init__(self):
        self.headers = self.Headers()

class KiteServiceServicer(holdings_pb2_grpc.KiteServiceServicer):
    def __init__(self):
        self._load_adapter()

    def _load_adapter(self):
        token_file = os.path.join(os.path.dirname(__file__), '..', 'swing-trading-service', '.kite_access_token')
        self.last_mtime = os.path.getmtime(token_file) if os.path.exists(token_file) else 0
        self.adapter = get_kite_adapter(DummyRequest())

    def GetHoldings(self, request, context):
        token_file = os.path.join(os.path.dirname(__file__), '..', 'swing-trading-service', '.kite_access_token')
        current_mtime = os.path.getmtime(token_file) if os.path.exists(token_file) else 0
        if current_mtime != self.last_mtime:
            print("Token file modified, reloading adapter...")
            self._load_adapter()

        try:
            holdings = self.adapter.holdings()
            
            response = holdings_pb2.HoldingsResponse()
            response.fallback = False
            for h in holdings:
                holding_msg = holdings_pb2.Holding(
                    tradingsymbol=h.get("tradingsymbol", ""),
                    exchange=h.get("exchange", ""),
                    instrument_token=str(h.get("instrument_token", "")),
                    quantity=int(h.get("quantity", 0)),
                    average_price=float(h.get("average_price", 0.0)),
                    last_price=float(h.get("last_price", 0.0)),
                    pnl=float(h.get("pnl", 0.0))
                )
                response.holdings.append(holding_msg)
            return response
        except Exception as e:
            print(f"Error in GetHoldings: {e}")
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return holdings_pb2.HoldingsResponse()

    def StreamLiveTicks(self, request, context):
        while context.is_active():
            time.sleep(1)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    holdings_pb2_grpc.add_KiteServiceServicer_to_server(KiteServiceServicer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Kite Service gRPC server started on port 50051")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
