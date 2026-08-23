@echo off
start cmd /k "cd frontend && npm run dev"
start cmd /k "cd backend && .\venv\Scripts\activate.bat && python -m uvicorn main:app --reload"
start cmd /k "cd backend\kite-service && ..\venv\Scripts\activate.bat && python grpc_server.py"
start cmd /k "cd backend\swing-trading-service && ..\venv\Scripts\activate.bat && python grpc_server.py"
