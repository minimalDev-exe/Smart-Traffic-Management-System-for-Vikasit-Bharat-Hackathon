from fastapi import APIRouter, Body
from typing import Dict, Any, List
from ..engine.traffic_engine import engine_instance

router = APIRouter(prefix="/api/scenarios", tags=["scenarios"])

PRESETS = [
    {
        "id": "normal",
        "name": "Normal Baseline Traffic",
        "description": "Standard steady-state traffic conditions across morning and evening peak hours.",
        "icon": "Activity",
        "peakPeriod": "Morning Peak (09:00 - 12:00)",
        "trafficMultiplier": 1.0,
        "affectedAuthorities": ["auth-a", "auth-b", "auth-c", "auth-d"]
    },
    {
        "id": "morning_peak",
        "name": "Morning Peak Surge (09:00 - 12:00)",
        "description": "Mass commuter influx into Central CBD and East Tech Corridor with 85% capacity utilization.",
        "icon": "Sunrise",
        "peakPeriod": "Morning Peak (09:00 - 12:00)",
        "trafficMultiplier": 1.45,
        "affectedAuthorities": ["auth-a", "auth-b"]
    },
    {
        "id": "evening_peak",
        "name": "Evening Peak Surge (16:00 - 19:00)",
        "description": "Outflow from Tech Parks toward residential suburbs with heavy eastbound bottlenecking.",
        "icon": "Sunset",
        "peakPeriod": "Evening Peak (16:00 - 19:00)",
        "trafficMultiplier": 1.5,
        "affectedAuthorities": ["auth-b", "auth-d"]
    },
    {
        "id": "accident_east",
        "name": "Accident on East Corridor",
        "description": "Multi-vehicle collision on Outer Ring Road blocking 2 out of 3 lanes, spiking Authority B queue to 890m.",
        "icon": "AlertTriangle",
        "peakPeriod": "Morning Peak (09:00 - 12:00)",
        "trafficMultiplier": 1.2,
        "affectedAuthorities": ["auth-b"],
        "blockedRoads": ["R-03"]
    },
    {
        "id": "heavy_rain",
        "name": "Monsoon Downpour & Waterlogging",
        "description": "Severe weather reducing average network speed by 40% and multiplying junction signal cycle delays.",
        "icon": "CloudRain",
        "peakPeriod": "Evening Peak (16:00 - 19:00)",
        "trafficMultiplier": 1.15,
        "affectedAuthorities": ["auth-a", "auth-b", "auth-c"]
    }
]

@router.get("")
def list_scenarios():
    return PRESETS

@router.post("/run")
def run_scenario(scenario_id: str = Body(..., embed=True)):
    return engine_instance.run_scenario(scenario_id)
