import asyncio
import grpc
from protos import holdings_pb2, holdings_pb2_grpc
from connection_manager import manager

async def consume_ticks():
    # Connect to the Swing-Trading Service
    channel = grpc.aio.insecure_channel('localhost:50052')
    stub = holdings_pb2_grpc.KiteServiceStub(channel)
    
    while True:
        try:
            request = holdings_pb2.LiveTicksRequest()
            print("Connecting to StreamLiveTicks gRPC endpoint...")
            
            # Start the streaming RPC
            async for tick in stub.StreamLiveTicks(request):
                tick_data = {
                    "instrument_token": tick.instrument_token,
                    "last_price": tick.last_price,
                    "volume": tick.volume,
                    "buy_quantity": tick.buy_quantity,
                    "sell_quantity": tick.sell_quantity,
                    "oi": tick.open_interest,
                    "timestamp": tick.timestamp
                }
                # Hook the received tick into websocket_manager (or connection_manager)
                await manager.broadcast_ticks([tick_data])
                
        except grpc.RpcError as e:
            print(f"gRPC stream disconnected: {e}. Retrying in 5 seconds...")
            await asyncio.sleep(5)
        except Exception as e:
            print(f"Unexpected error in gRPC consumer: {e}. Retrying in 5 seconds...")
            await asyncio.sleep(5)
