from fastapi import APIRouter, Body
from typing import Dict, Any, List
from ..engine.traffic_engine import engine_instance

router = APIRouter(prefix="/api/strategy", tags=["optimizer"])

RECOMMENDATIONS = [
    {
        "id": "strat-01",
        "type": "signal_retiming",
        "title": "Adaptive Signal Retiming at J-14 (East Tech Hub)",
        "target_location": "Junction J-14 · Outer Ring Road & ITPL Main",
        "target_authority": "Authority B — East Tech Corridor",
        "recommended_action": "Increase green signal duration for North-South arterial by 18 seconds and dynamically coordinate upstream phase.",
        "expected_impact": {
            "queue_reduction": "↓21%",
            "avg_wait": "↓14%",
            "throughput": "↑9%"
        },
        "priority": "URGENT"
    },
    {
        "id": "strat-02",
        "type": "cross_authority_rerouting",
        "title": "Cross-Jurisdiction Load Balancing via Authority D Bypass",
        "target_location": "East Corridor → West Peripheral Bypass (R-09)",
        "target_authority": "Authority B & Authority D",
        "recommended_action": "Dynamic VMS & navigation guidance to divert 22% of through-traffic toward West Bypass with 66% free capacity.",
        "expected_impact": {
            "queue_reduction": "↓34%",
            "avg_wait": "↓28%",
            "throughput": "↑18%"
        },
        "priority": "HIGH"
    },
    {
        "id": "strat-03",
        "type": "green_wave",
        "title": "CBD Corridor Green Wave Synchronization",
        "target_location": "MG Road Arterial (R-01) · Junction J-01",
        "target_authority": "Authority A — Central CBD",
        "recommended_action": "Offset progression speed at 42 km/h across J-01, J-02, J-03 for platoon clearance.",
        "expected_impact": {
            "queue_reduction": "↓18%",
            "avg_wait": "↓22%",
            "throughput": "↑12%"
        },
        "priority": "MEDIUM"
    }
]

@router.get("/recommendations")
def get_recommendations():
    applied_ids = [s["id"] for s in engine_instance.applied_strategies]
    res = []
    for r in RECOMMENDATIONS:
        item = dict(r)
        item["applied"] = item["id"] in applied_ids
        res.append(item)
    return res

@router.post("/apply")
def apply_strategy(strategy_id: str = Body(..., embed=True)):
    return engine_instance.apply_strategy(strategy_id)

@router.post("/simulate")
def simulate_strategy_impact(strategy_id: str = Body(..., embed=True)):
    return {
        "strategy_id": strategy_id,
        "predicted_avg_speed_improvement": "+28%",
        "predicted_congestion_drop": "-35%",
        "predicted_imbalance_reduction": "-48 pts (High -> Balanced)",
        "confidence_score": "94.2%"
    }
