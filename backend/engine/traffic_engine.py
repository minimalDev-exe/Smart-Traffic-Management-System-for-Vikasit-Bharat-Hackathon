import copy
import random
from typing import Dict, Any, List
from .city_grid import PLANNING_AUTHORITIES, JUNCTIONS, ROADS
from .imbalance import calculate_imbalance_score
from .traci_adapter import traci_adapter_instance

class TrafficSimulationEngine:
    def __init__(self):
        self.state = "STOPPED"  # STOPPED, RUNNING, PAUSED
        self.current_time_seconds = 9 * 3600  # 09:00 AM (32400 s)
        self.peak_period = "Morning Peak (09:00 - 12:00)"
        self.speed_multiplier = 1
        self.active_scenario = "normal"
        self.active_scenario_name = "Normal Peak Flow"
        self.authorities = copy.deepcopy(PLANNING_AUTHORITIES)
        self.junctions = copy.deepcopy(JUNCTIONS)
        self.roads = copy.deepcopy(ROADS)
        self.applied_strategies: List[Dict[str, Any]] = []
        self.before_metrics = self._calculate_current_aggregates()

    def start(self):
        self.state = "RUNNING"
        return self.get_status()

    def pause(self):
        self.state = "PAUSED"
        return self.get_status()

    def resume(self):
        self.state = "RUNNING"
        return self.get_status()

    def stop(self):
        self.state = "STOPPED"
        return self.get_status()

    def reset(self):
        self.state = "STOPPED"
        self.current_time_seconds = 9 * 3600
        self.authorities = copy.deepcopy(PLANNING_AUTHORITIES)
        self.junctions = copy.deepcopy(JUNCTIONS)
        self.roads = copy.deepcopy(ROADS)
        self.applied_strategies = []
        self.active_scenario = "normal"
        self.active_scenario_name = "Normal Peak Flow"
        self.before_metrics = self._calculate_current_aggregates()
        return self.get_status()

    def set_speed(self, multiplier: int):
        self.speed_multiplier = multiplier
        return {"speed_multiplier": multiplier}

    def set_time(self, seconds: int):
        self.current_time_seconds = seconds
        self._simulate_tick(0)
        return self.get_status()

    def apply_strategy(self, strategy_id: str):
        if strategy_id not in [s.get("id") for s in self.applied_strategies]:
            self.applied_strategies.append({
                "id": strategy_id,
                "applied_at_seconds": self.current_time_seconds
            })
        self._apply_active_strategies_effects()
        return {"status": "success", "strategy_id": strategy_id, "active_count": len(self.applied_strategies)}

    def run_scenario(self, scenario_id: str, scenario_data: Dict[str, Any] = None):
        self.active_scenario = scenario_id
        if scenario_id == "accident_east":
            self.active_scenario_name = "Accident on Outer Ring Road (East Corridor)"
            # Spike Authority B congestion
            for a in self.authorities:
                if a["id"] == "auth-b":
                    a["road_utilization_percent"] = 96.5
                    a["avg_speed_kmh"] = 8.5
                    a["active_bottlenecks"] = 5
        elif scenario_id == "morning_peak":
            self.active_scenario_name = "Morning Peak Surge (09:00 - 12:00)"
        elif scenario_id == "evening_peak":
            self.active_scenario_name = "Evening Peak Surge (16:00 - 19:00)"
            self.current_time_seconds = 16 * 3600
            self.peak_period = "Evening Peak (16:00 - 19:00)"
        return self.get_status()

    def tick(self, delta_seconds: int = 1):
        if self.state != "RUNNING":
            return self.get_status()
        
        sim_delta = delta_seconds * self.speed_multiplier
        self.current_time_seconds += sim_delta
        
        # Keep time bounded to 24h
        if self.current_time_seconds > 24 * 3600:
            self.current_time_seconds = 9 * 3600

        self._simulate_tick(sim_delta)
        return self.get_status()

    def _simulate_tick(self, delta_seconds: int):
        # Dynamic subtle variance based on time
        hour = (self.current_time_seconds // 3600) % 24
        minute = (self.current_time_seconds % 3600) // 60
        
        # Apply strategies benefit if active
        strategy_benefit = min(0.65, len(self.applied_strategies) * 0.25)

        for auth in self.authorities:
            if auth["id"] == "auth-b":
                base_u = 91.5
                base_s = 14.8
                if strategy_benefit > 0:
                    auth["road_utilization_percent"] = round(base_u - (strategy_benefit * 32.0), 1)
                    auth["avg_speed_kmh"] = round(base_s + (strategy_benefit * 22.0), 1)
                    auth["active_bottlenecks"] = max(0, 4 - int(strategy_benefit * 4))
            elif auth["id"] == "auth-d":
                base_u = 34.0
                if strategy_benefit > 0:
                    # Absorb rerouted load
                    auth["road_utilization_percent"] = round(base_u + (strategy_benefit * 18.0), 1)
                    auth["avg_speed_kmh"] = max(36.0, round(46.2 - (strategy_benefit * 6.0), 1))

        # Rebalance traffic share
        total_veh = sum(a["vehicles"] for a in self.authorities)
        for a in self.authorities:
            a["traffic_share_percent"] = round((a["vehicles"] / max(1, total_veh)) * 100.0, 1)

    def _apply_active_strategies_effects(self):
        self._simulate_tick(1)

    def _calculate_current_aggregates(self):
        total_v = sum(a["vehicles"] for a in self.authorities)
        avg_sp = sum(a["avg_speed_kmh"] for a in self.authorities) / len(self.authorities)
        imbalance = calculate_imbalance_score(self.authorities)
        return {
            "total_vehicles": total_v,
            "avg_speed_kmh": round(avg_sp, 1),
            "congestion_zones_count": sum(a["active_bottlenecks"] for a in self.authorities),
            "avg_travel_time_min": round(max(8.0, 45.0 - (avg_sp * 0.8)), 1),
            "co2_emissions_tons": round(max(1.5, (total_v / 3000.0) * (45.0 / max(10.0, avg_sp))), 1),
            "network_efficiency_percent": round(max(20.0, min(99.0, (avg_sp / 50.0) * 100.0 * (1.0 - imbalance["score"] / 200.0))), 1),
            "imbalance_score": imbalance["score"]
        }

    def get_status(self):
        hour = (self.current_time_seconds // 3600) % 24
        minute = (self.current_time_seconds % 3600) // 60
        ampm = "AM" if hour < 12 else "PM"
        display_hour = hour if 1 <= hour <= 12 else (12 if hour % 12 == 0 else hour % 12)
        time_str = f"{display_hour:02d}:{minute:02d} {ampm}"
        
        aggregates = self._calculate_current_aggregates()
        imbalance = calculate_imbalance_score(self.authorities)

        return {
            "state": self.state,
            "current_time": time_str,
            "time_seconds": self.current_time_seconds,
            "peak_period": self.peak_period,
            "speed_multiplier": self.speed_multiplier,
            "active_scenario_id": self.active_scenario,
            "active_scenario_name": self.active_scenario_name,
            "total_vehicles": aggregates["total_vehicles"],
            "avg_speed_kmh": aggregates["avg_speed_kmh"],
            "congestion_zones_count": aggregates["congestion_zones_count"],
            "avg_travel_time_min": aggregates["avg_travel_time_min"],
            "co2_emissions_tons": aggregates["co2_emissions_tons"],
            "network_efficiency_percent": aggregates["network_efficiency_percent"],
            "imbalance_score": imbalance["score"],
            "imbalance_classification": imbalance["classification"],
            "imbalance_explanation": imbalance["explanation"],
            "applied_strategies_count": len(self.applied_strategies),
            "traci_connected": traci_adapter_instance.is_connected(),
            "engine_type": "SUMO/TraCI Bridge" if traci_adapter_instance.is_connected() else "FastAPI Simulation Engine (Mock Fallback)",
        }

engine_instance = TrafficSimulationEngine()
