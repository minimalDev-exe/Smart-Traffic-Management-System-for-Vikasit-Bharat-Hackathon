from fastapi import APIRouter
from ..engine.traffic_engine import engine_instance

router = APIRouter(prefix="/api/analytics", tags=["analytics"])

@router.get("")
def get_analytics():
    # Generate realistic peak period time series
    time_series = [
        {"time": "09:00 AM", "vehicles": 8200, "avgSpeed": 42.0, "congestion": 35.0, "authA": 2200, "authB": 2800, "authC": 1800, "authD": 1400},
        {"time": "09:30 AM", "vehicles": 10500, "avgSpeed": 35.5, "congestion": 52.0, "authA": 3100, "authB": 4200, "authC": 1950, "authD": 1250},
        {"time": "10:00 AM", "vehicles": 12843, "avgSpeed": 31.0, "congestion": 74.0, "authA": 3840, "authB": 5120, "authC": 2210, "authD": 1673},
        {"time": "10:30 AM", "vehicles": 13200, "avgSpeed": 26.5, "congestion": 81.0, "authA": 4100, "authB": 5600, "authC": 2100, "authD": 1400},
        {"time": "11:00 AM", "vehicles": 11800, "avgSpeed": 32.0, "congestion": 68.0, "authA": 3600, "authB": 4800, "authC": 2000, "authD": 1400},
        {"time": "11:30 AM", "vehicles": 9900, "avgSpeed": 39.0, "congestion": 45.0, "authA": 2900, "authB": 3700, "authC": 1850, "authD": 1450},
        {"time": "12:00 PM", "vehicles": 8400, "avgSpeed": 44.0, "congestion": 32.0, "authA": 2300, "authB": 2900, "authC": 1750, "authD": 1450},
    ]
    return {
        "peak_window": "Morning Peak (09:00 AM - 12:00 PM)",
        "time_series": time_series,
        "current_metrics": engine_instance.get_status()
    }
