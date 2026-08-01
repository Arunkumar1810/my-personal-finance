import grpc
from protos import holdings_pb2, holdings_pb2_grpc

def test_holdings():
    channel = grpc.insecure_channel('localhost:50052')
    stub = holdings_pb2_grpc.KiteServiceStub(channel)
    request = holdings_pb2.HoldingsRequest()
    try:
        response = stub.GetHoldings(request)
        print("Fallback:", response.fallback)
        for h in response.holdings:
            print(f"{h.tradingsymbol} (Token: {h.instrument_token}): Qty {h.quantity}, Avg {h.average_price}, LTP {h.last_price}")
    except Exception as e:
        print("Error calling gRPC:", e)

if __name__ == "__main__":
    test_holdings()
