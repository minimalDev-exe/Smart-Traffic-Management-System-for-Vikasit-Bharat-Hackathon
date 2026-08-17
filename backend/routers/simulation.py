from fastapi import APIRouter, Body
from typing import Dict, Any, Optional
from ..engine.traffic_engine import engine_instance
from ..models.schemas import SimulationStatus

router = APIRouter(prefix="/api/simulation", tags=["simulation"])

@router.get("/status")
def get_simulation_status():
    return engine_instance.get_status()

@router.post("/start")
def start_simulation():
    return engine_instance.start()

@router.post("/pause")
def pause_simulation():
    return engine_instance.pause()

@router.post("/resume")
def resume_simulation():
    return engine_instance.resume()

@router.post("/stop")
def stop_simulation():
    return engine_instance.stop()

@router.post("/reset")
def reset_simulation():
    return engine_instance.reset()

@router.post("/speed")
def set_speed(multiplier: int = Body(..., embed=True)):
    return engine_instance.set_speed(multiplier)

@router.post("/time")
def set_time(seconds: int = Body(..., embed=True)):
    return engine_instance.set_time(seconds)

@router.post("/tick")
def tick_simulation(delta_seconds: int = Body(1, embed=True)):
    return engine_instance.tick(delta_seconds)
