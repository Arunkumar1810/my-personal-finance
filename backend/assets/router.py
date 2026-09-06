from fastapi import APIRouter

from .assets_dashboard.router import router as assets_dashboard_router
from .indian_etfs.router import router as indian_etfs_router
from .indian_lt_stocks.router import router as indian_lt_stocks_router
from .us_stocks_etfs.router import router as us_stocks_etfs_router
from .indian_swing_trading.router import router as indian_swing_trading_router
from .esops_rsus.router import router as esops_rsus_router
from .fixed_deposits.router import router as fixed_deposits_router
from .pf.router import router as pf_router
from .indian_bonds.router import router as indian_bonds_router

router = APIRouter()

router.include_router(assets_dashboard_router)
router.include_router(indian_etfs_router)
router.include_router(indian_lt_stocks_router)
router.include_router(us_stocks_etfs_router)
router.include_router(indian_swing_trading_router)
router.include_router(esops_rsus_router)
router.include_router(fixed_deposits_router)
router.include_router(pf_router)
router.include_router(indian_bonds_router)
