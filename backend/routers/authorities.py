from fastapi import APIRouter
from ..engine.traffic_engine import engine_instance
from ..engine.imbalance import calculate_imbalance_score

router = APIRouter(prefix="/api/authorities", tags=["authorities"])

@router.get("")
def get_authorities():
    imbalance = calculate_imbalance_score(engine_instance.authorities)
    return {
        "authorities": engine_instance.authorities,
        "imbalance": imbalance
    }

@router.get("/imbalance")
def get_imbalance():
    return calculate_imbalance_score(engine_instance.authorities)
