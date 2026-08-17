from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class RoadSegment(BaseModel):
    id: str
    name: str
    authority_id: str
    authority_name: str
    coordinates: List[List[float]]  # [[lat, lng], [lat, lng], ...]
    length_meters: float
    lanes: int
    speed_limit_kmh: float
    current_speed_kmh: float
    current_vehicles: int
    capacity: int
    density: str  # "Low", "Moderate", "High", "Critical"
    queue_length_meters: float
    travel_time_minutes: float
    congestion_level: str  # "Free Flowing", "Moderate", "Heavy", "Severe Congestion"
    congestion_percent: float
    status: str  # "Clear", "Slow", "Congested", "Blocked"

class Junction(BaseModel):
    id: str
    name: str
    authority_id: str
    coordinates: List[float]  # [lat, lng]
    connected_roads: List[str]
    signal_phase: str  # "North-South Green", "East-West Green", "All Red", "Adaptive"
    green_duration_seconds: int
    cycle_time_seconds: int
    current_queue_length_meters: float
    adaptive_enabled: bool
    direction_counts: Dict[str, int]  # {"north": 120, "south": 95, "east": 240, "west": 180}

class AuthorityStats(BaseModel):
    id: str
    name: str
    code: str
    color: str
    area_sqkm: float
    boundary_coordinates: List[List[float]]
    vehicles: int
    road_utilization_percent: float
    congestion_level: str  # "LOW", "MODERATE", "HIGH", "CRITICAL"
    avg_speed_kmh: float
    traffic_share_percent: float
    active_bottlenecks: int
    queue_accumulated_meters: float

class ImbalanceBreakdown(BaseModel):
    score: int  # 0 to 100
    classification: str  # "OPTIMAL", "MODERATE IMBALANCE", "HIGH IMBALANCE", "CRITICAL CRISIS"
    explanation: str
    utilization_std_dev: float
    max_min_spread_percent: float
    bottleneck_penalty: float
    traffic_share_disparity: float
    highest_loaded_authority: str
    lowest_loaded_authority: str

class AIStrategy(BaseModel):
    id: str
    type: str  # "signal_retiming", "cross_authority_rerouting", "one_way_arterial", "green_wave", "incident_clearance"
    title: str
    target_location: str
    target_authority: str
    recommended_action: str
    expected_impact: Dict[str, str]  # {"queue_reduction": "21%", "avg_wait": "14%", "throughput": "+9%"}
    applied: bool = False
    applied_at: Optional[str] = None
    priority: str  # "URGENT", "HIGH", "MEDIUM"

class SimulationStatus(BaseModel):
    state: str  # "STOPPED", "RUNNING", "PAUSED"
    current_time: str  # "09:42 AM"
    time_seconds: int  # e.g. 35000 (seconds from midnight)
    peak_period: str  # "Morning Peak (09:00 - 12:00)" or "Evening Peak (16:00 - 19:00)"
    speed_multiplier: int  # 1, 2, 5, 10, 50, 100
    active_scenario_id: Optional[str] = "normal"
    active_scenario_name: Optional[str] = "Normal Peak Flow"
    total_vehicles: int
    avg_speed_kmh: float
    congestion_zones_count: int
    avg_travel_time_min: float
    co2_emissions_tons: float
    network_efficiency_percent: float
    imbalance_score: int

class TeamRegistration(BaseModel):
    theme: str
    team_name: str
    team_lead: Dict[str, str]
    members: List[Dict[str, str]]
    timestamp: str
    workspace_id: str
