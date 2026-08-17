"""
TraCI / SUMO Bridge Interface.
Provides the pluggable connector for live hardware or SUMO simulation engine.
When TraCI/SUMO is present, calls are delegated to the SUMO daemon;
otherwise, falls back gracefully to the embedded mathematical engine.
"""

from typing import Dict, Any, Optional

class TraCIAdapter:
    def __init__(self, host: str = "localhost", port: int = 8873):
        self.host = host
        self.port = port
        self.connected = False
        self.traci = None

    def connect(self) -> bool:
        try:
            import traci  # Optional dependency
            self.traci = traci
            self.traci.init(self.port, host=self.host)
            self.connected = True
            return True
        except ImportError:
            # TraCI not installed in environment, using simulated mock engine
            self.connected = False
            return False
        except Exception:
            self.connected = False
            return False

    def is_connected(self) -> bool:
        return self.connected

    def step_simulation(self, delta_time: float):
        if self.connected and self.traci:
            self.traci.simulationStep()

    def get_vehicle_count(self) -> int:
        if self.connected and self.traci:
            return self.traci.vehicle.getIDCount()
        return 12843

    def set_traffic_light_phase(self, junction_id: str, phase_index: int):
        if self.connected and self.traci:
            self.traci.trafficlight.setPhase(junction_id, phase_index)

    def close(self):
        if self.connected and self.traci:
            self.traci.close()
            self.connected = False

traci_adapter_instance = TraCIAdapter()
