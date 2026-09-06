from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse
import sys
import os

sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'swing-trading-service'))
from kite_client import get_kite_login_url, authenticate_kite

router = APIRouter(tags=["auth"])

@router.get("/api/auth/login-url")
def auth_login_url():
    url = get_kite_login_url()
    if url:
        return {"url": url}
    else:
        raise HTTPException(status_code=500, detail="Kite API Key not configured")

@router.get("/api/auth/callback")
def auth_callback(request_token: str):
    kite = authenticate_kite(request_token=request_token)
    if kite:
        return RedirectResponse(url="http://localhost:5173/settings?auth=success")
    else:
        return RedirectResponse(url="http://localhost:5173/settings?auth=error")
