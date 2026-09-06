from fastapi import APIRouter, HTTPException
import sqlite3
import grpc
import os
import sys
from common.database import get_wealth_db_connection

sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'swing-trading-service'))
from protos import holdings_pb2, holdings_pb2_grpc

router = APIRouter(tags=["portfolio-valuation"])

def get_grpc_stub():
    channel = grpc.insecure_channel('localhost:50052')
    return holdings_pb2_grpc.KiteServiceStub(channel)

@router.get("/valuations")
def get_valuations():
    conn = get_wealth_db_connection()
    try:
        c = conn.cursor()
        c.execute("SELECT a.*, sum(t.quantity) as total_qty, avg(t.price) as avg_price FROM assets a LEFT JOIN transactions t ON a.id = t.asset_id GROUP BY a.id")
        assets = [dict(r) for r in c.fetchall()]
        
        c.execute("SELECT * FROM market_prices")
        prices = {r['asset_id']: r['close_price'] for r in c.fetchall()}
        
        for a in assets:
            avg_price = a['avg_price'] if a['avg_price'] is not None else 0
            current_price = prices.get(a['id'], avg_price)
            a['current_value'] = (a['total_qty'] or 0) * current_price
            
        return {"assets": assets}
    except sqlite3.OperationalError:
        return {"assets": []}
    finally:
        conn.close()

@router.get("/api/portfolio-valuation")
async def get_portfolio_valuation():
    stub = get_grpc_stub()
    request = holdings_pb2.PortfolioValuationRequest()
    
    try:
        response = stub.GetPortfolioValuation(request, timeout=5.0)
        transactions = []
        for tx in response.transactions:
            transactions.append({
                "date": tx.date,
                "amount": tx.amount,
                "type": tx.type
            })
            
        return {
            "current_value": response.current_value,
            "available_funds": response.available_funds,
            "xirr": response.xirr,
            "transactions": transactions
        }
    except grpc.RpcError as e:
        if e.code() == grpc.StatusCode.DEADLINE_EXCEEDED:
            raise HTTPException(status_code=504, detail="Gateway Timeout: Swing-Trading Service took too long to respond.")
        raise HTTPException(status_code=502, detail=f"Bad Gateway: {e.details()}")
