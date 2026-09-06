from fastapi import WebSocket
from typing import List
import json

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast_holdings(self, holdings_data):
        payload = json.dumps({"type": "holdings_update", "data": holdings_data})
        for connection in self.active_connections:
            try:
                await connection.send_text(payload)
            except Exception as e:
                print(f"Error broadcasting to client: {e}")

    async def broadcast_unified(self, unified_data):
        payload = json.dumps({"type": "unified_update", "data": unified_data})
        for connection in self.active_connections:
            try:
                await connection.send_text(payload)
            except Exception as e:
                print(f"Error broadcasting to client: {e}")

    async def broadcast_ticks(self, ticks_data):
        # Using a custom default to handle any non-serializable datetimes if present
        payload = json.dumps({"type": "live_ticks", "data": ticks_data}, default=str)
        for connection in self.active_connections:
            try:
                await connection.send_text(payload)
            except Exception as e:
                print(f"Error broadcasting ticks to client: {e}")

manager = ConnectionManager()
