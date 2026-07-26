from fastapi import Request, HTTPException
from .i_kite_adapter import IKiteAdapter
from .dev_adapter import DevModeKiteAdapter
from .production_adapter import ProductionKiteAdapter
from kite_client import authenticate_kite

def get_kite_adapter(request: Request) -> IKiteAdapter:
    """
    FastAPI dependency that acts as an interceptor factory.
    Reads the 'X-Dev-Mode' header and returns the appropriate adapter instance.
    """
    is_dev_mode = request.headers.get("X-Dev-Mode") == "true"
    
    if is_dev_mode:
        return DevModeKiteAdapter()
        
    kite_client = authenticate_kite()
    if not kite_client:
        raise HTTPException(status_code=500, detail="Failed to initialize Kite Production Adapter")
        
    return ProductionKiteAdapter(kite_client)
