from fastapi import APIRouter
from ..engine.traffic_engine import engine_instance

router = APIRouter(prefix="/api", tags=["traffic"])

@router.get("/traffic")
def get_traffic_overview():
    return engine_instance.get_status()

@router.get("/roads")
def get_roads():
    return engine_instance.roads

@router.get("/junctions")
def get_junctions():
    return engine_instance.junctions

@router.get("/congestion")
def get_congestion():
    # Return hot spots and zones
    hotspots = []
    for r in engine_instance.roads:
        if r["congestion_percent"] > 70.0:
            hotspots.append({
                "road_id": r["id"],
                "name": r["name"],
                "authority_id": r["authority_id"],
                "congestion_percent": r["congestion_percent"],
                "queue_length_meters": r["queue_length_meters"],
                "coordinates": r["coordinates"]
            })
    return {
        "active_hotspots_count": len(hotspots),
        "hotspots": hotspots
    }
