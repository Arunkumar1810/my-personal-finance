import grpc
import time
import asyncio
from concurrent import futures
import queue
from protos import holdings_pb2, holdings_pb2_grpc
from kite_service_client import KiteServiceClient
from xirr_calc import calculate_xirr
import datetime

# A global list/set of active stream queues to route ticks to clients
active_tick_streams = []

class SwingTradingServiceServicer(holdings_pb2_grpc.KiteServiceServicer):
    def __init__(self):
        self.kite_client = KiteServiceClient()

    def GetHoldings(self, request, context):
        holdings_res = self.kite_client.get_holdings()
        if holdings_res is None:
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details("Failed to fetch holdings from Kite Service")
            return holdings_pb2.HoldingsResponse()
            
        response = holdings_pb2.HoldingsResponse()
        response.fallback = holdings_res.get("fallback", False)
        for h in holdings_res["holdings"]:
            holding_msg = holdings_pb2.Holding(
                tradingsymbol=h.get("tradingsymbol", ""),
                exchange=h.get("exchange", ""),
                instrument_token=str(h.get("instrument_token", "")),
                quantity=h.get("quantity", 0),
                average_price=h.get("average_price", 0.0),
                last_price=h.get("last_price", 0.0),
                pnl=h.get("pnl", 0.0)
            )
            response.holdings.append(holding_msg)
        return response

    def GetPortfolioValuation(self, request, context):
        holdings_res = self.kite_client.get_holdings()
        margins_res = self.kite_client.get_margins()
        tx_res = self.kite_client.get_cash_transactions()
        
        current_value = 0.0
        if holdings_res and not holdings_res.get("fallback", False):
            for h in holdings_res["holdings"]:
                current_value += h.get("quantity", 0) * h.get("last_price", 0.0)
                
        available_funds = margins_res.get("available_cash", 0.0)
        
        # Calculate XIRR
        transactions = tx_res.get("transactions", [])
        
        # To calculate true XIRR, we add the current portfolio value as a final withdrawal (positive cash flow for the user)
        xirr_flows = list(transactions)
        if current_value + available_funds > 0:
            xirr_flows.append({
                "date": datetime.date.today().isoformat(),
                "amount": current_value + available_funds,
                "type": "withdrawal"
            })
            
        # Amounts for XIRR: deposits are negative (cash out of pocket), withdrawals are positive (cash in hand)
        formatted_flows = []
        for tx in xirr_flows:
            amount = tx["amount"]
            if tx["type"] == "deposit" and amount > 0:
                amount = -amount # Outflow from investor's perspective
            formatted_flows.append({"date": tx["date"], "amount": amount})
            
        xirr = calculate_xirr(formatted_flows)
        
        response = holdings_pb2.PortfolioValuationResponse(
            current_value=current_value,
            available_funds=available_funds,
            xirr=xirr
        )
        
        for tx in transactions:
            response.transactions.append(holdings_pb2.CashTransaction(
                date=tx["date"],
                amount=tx["amount"],
                type=tx["type"]
            ))
            
        return response

    def StreamLiveTicks(self, request, context):
        # Create a queue for this specific client stream
        client_queue = queue.Queue()
        active_tick_streams.append(client_queue)
        
        try:
            while context.is_active():
                try:
                    # Wait for a tick to be published to this queue
                    tick = client_queue.get(timeout=1.0)
                    yield tick
                except queue.Empty:
                    # Timeout reached, just loop and check if context is still active
                    continue
        finally:
            # Client disconnected, remove their queue
            if client_queue in active_tick_streams:
                active_tick_streams.remove(client_queue)

def broadcast_tick_to_streams(tick_data: dict):
    """
    Called by kite_ticker_manager.py when a tick is received from Kite.
    This routes the tick to all connected gRPC clients.
    """
    tick_msg = holdings_pb2.LiveTick(
        instrument_token=str(tick_data.get("instrument_token", "")),
        last_price=float(tick_data.get("last_price", 0.0)),
        volume=int(tick_data.get("volume", 0)),
        buy_quantity=float(tick_data.get("buy_quantity", 0.0)),
        sell_quantity=float(tick_data.get("sell_quantity", 0.0)),
        open_interest=float(tick_data.get("oi", 0.0)),
        timestamp=str(tick_data.get("timestamp", ""))
    )
    for q in active_tick_streams:
        try:
            q.put_nowait(tick_msg)
        except queue.Full:
            pass

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    holdings_pb2_grpc.add_KiteServiceServicer_to_server(SwingTradingServiceServicer(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("Swing-Trading Service gRPC server started on port 50052")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
