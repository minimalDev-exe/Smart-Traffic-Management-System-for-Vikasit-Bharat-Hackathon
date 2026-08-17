"""
Metropolitan City Grid definition for the Smart City Command Center.
Features 4 Planning Authorities:
  - Authority A: Central Business District (CBD) & Financial Hub
  - Authority B: East IT Corridor & Tech Park (High Congestion Bottleneck)
  - Authority C: South Industrial & Logistics Ring
  - Authority D: West Residential & Green Suburbs
"""

PLANNING_AUTHORITIES = [
    {
        "id": "auth-a",
        "name": "Authority A — Central CBD",
        "code": "AUTH-A",
        "color": "#3B82F6",  # Blue
        "area_sqkm": 42.5,
        "boundary_coordinates": [
            [12.9780, 77.5850],
            [12.9850, 77.6100],
            [12.9650, 77.6200],
            [12.9550, 77.5900]
        ],
        "vehicles": 3840,
        "road_utilization_percent": 74.0,
        "congestion_level": "HIGH",
        "avg_speed_kmh": 24.5,
        "traffic_share_percent": 29.9,
        "active_bottlenecks": 2,
        "queue_accumulated_meters": 420.0
    },
    {
        "id": "auth-b",
        "name": "Authority B — East Tech Corridor",
        "code": "AUTH-B",
        "color": "#EF4444",  # Red / Hot
        "area_sqkm": 58.2,
        "boundary_coordinates": [
            [12.9850, 77.6100],
            [13.0000, 77.6700],
            [12.9600, 77.6850],
            [12.9450, 77.6250],
            [12.9650, 77.6200]
        ],
        "vehicles": 5120,
        "road_utilization_percent": 91.5,
        "congestion_level": "CRITICAL",
        "avg_speed_kmh": 14.8,
        "traffic_share_percent": 39.8,
        "active_bottlenecks": 4,
        "queue_accumulated_meters": 890.0
    },
    {
        "id": "auth-c",
        "name": "Authority C — South Logistics Ring",
        "code": "AUTH-C",
        "color": "#F59E0B",  # Amber
        "area_sqkm": 64.0,
        "boundary_coordinates": [
            [12.9550, 77.5900],
            [12.9450, 77.6250],
            [12.9100, 77.6400],
            [12.9000, 77.5800]
        ],
        "vehicles": 2210,
        "road_utilization_percent": 52.0,
        "congestion_level": "MODERATE",
        "avg_speed_kmh": 38.0,
        "traffic_share_percent": 17.2,
        "active_bottlenecks": 1,
        "queue_accumulated_meters": 180.0
    },
    {
        "id": "auth-d",
        "name": "Authority D — West Suburbs & Bypass",
        "code": "AUTH-D",
        "color": "#10B981",  # Emerald
        "area_sqkm": 71.3,
        "boundary_coordinates": [
            [12.9780, 77.5850],
            [12.9550, 77.5900],
            [12.9000, 77.5800],
            [12.9200, 77.5300],
            [12.9700, 77.5400]
        ],
        "vehicles": 1673,
        "road_utilization_percent": 34.0,
        "congestion_level": "LOW",
        "avg_speed_kmh": 46.2,
        "traffic_share_percent": 13.1,
        "active_bottlenecks": 0,
        "queue_accumulated_meters": 45.0
    }
]

JUNCTIONS = [
    {
        "id": "J-01",
        "name": "CBD Central Square (J-01)",
        "authority_id": "auth-a",
        "coordinates": [12.9716, 77.5946],
        "connected_roads": ["R-01", "R-02", "R-05"],
        "signal_phase": "North-South Green",
        "green_duration_seconds": 35,
        "cycle_time_seconds": 90,
        "current_queue_length_meters": 140.0,
        "adaptive_enabled": True,
        "direction_counts": {"north": 310, "south": 280, "east": 190, "west": 165}
    },
    {
        "id": "J-14",
        "name": "East Tech Corridor Hub (J-14)",
        "authority_id": "auth-b",
        "coordinates": [12.9780, 77.6400],
        "connected_roads": ["R-03", "R-04", "R-08"],
        "signal_phase": "East-West Green",
        "green_duration_seconds": 25,
        "cycle_time_seconds": 120,
        "current_queue_length_meters": 340.0,
        "adaptive_enabled": False,
        "direction_counts": {"north": 180, "south": 195, "east": 640, "west": 580}
    },
    {
        "id": "J-08",
        "name": "South Outer Junction (J-08)",
        "authority_id": "auth-c",
        "coordinates": [12.9300, 77.6100],
        "connected_roads": ["R-06", "R-07"],
        "signal_phase": "Adaptive",
        "green_duration_seconds": 40,
        "cycle_time_seconds": 80,
        "current_queue_length_meters": 65.0,
        "adaptive_enabled": True,
        "direction_counts": {"north": 140, "south": 120, "east": 160, "west": 110}
    },
    {
        "id": "J-04",
        "name": "West Arterial Interchange (J-04)",
        "authority_id": "auth-d",
        "coordinates": [12.9450, 77.5600],
        "connected_roads": ["R-09", "R-10"],
        "signal_phase": "North-South Green",
        "green_duration_seconds": 50,
        "cycle_time_seconds": 75,
        "current_queue_length_meters": 30.0,
        "adaptive_enabled": True,
        "direction_counts": {"north": 85, "south": 90, "east": 110, "west": 95}
    }
]

ROADS = [
    {
        "id": "R-01",
        "name": "MG Road Arterial",
        "authority_id": "auth-a",
        "authority_name": "Authority A — Central CBD",
        "coordinates": [[12.9750, 77.5850], [12.9716, 77.5946], [12.9700, 77.6100]],
        "length_meters": 2800.0,
        "lanes": 6,
        "speed_limit_kmh": 50.0,
        "current_speed_kmh": 22.0,
        "current_vehicles": 1420,
        "capacity": 1800,
        "density": "High",
        "queue_length_meters": 165.0,
        "travel_time_minutes": 7.6,
        "congestion_level": "Heavy",
        "congestion_percent": 78.8,
        "status": "Congested"
    },
    {
        "id": "R-03",
        "name": "Outer Ring Road (East Corridor)",
        "authority_id": "auth-b",
        "authority_name": "Authority B — East Tech Corridor",
        "coordinates": [[12.9700, 77.6100], [12.9780, 77.6400], [12.9900, 77.6700]],
        "length_meters": 6400.0,
        "lanes": 6,
        "speed_limit_kmh": 60.0,
        "current_speed_kmh": 12.5,
        "current_vehicles": 3150,
        "capacity": 3200,
        "density": "Critical",
        "queue_length_meters": 540.0,
        "travel_time_minutes": 30.7,
        "congestion_level": "Severe Congestion",
        "congestion_percent": 98.4,
        "status": "Congested"
    },
    {
        "id": "R-04",
        "name": "ITPL Main Expressway",
        "authority_id": "auth-b",
        "authority_name": "Authority B — East Tech Corridor",
        "coordinates": [[12.9780, 77.6400], [12.9850, 77.6650], [12.9600, 77.6850]],
        "length_meters": 4500.0,
        "lanes": 4,
        "speed_limit_kmh": 50.0,
        "current_speed_kmh": 16.0,
        "current_vehicles": 1970,
        "capacity": 2200,
        "density": "Critical",
        "queue_length_meters": 350.0,
        "travel_time_minutes": 16.9,
        "congestion_level": "Severe Congestion",
        "congestion_percent": 89.5,
        "status": "Congested"
    },
    {
        "id": "R-06",
        "name": "Hosur Expressway Connector",
        "authority_id": "auth-c",
        "authority_name": "Authority C — South Logistics Ring",
        "coordinates": [[12.9550, 77.5900], [12.9300, 77.6100], [12.9100, 77.6400]],
        "length_meters": 5800.0,
        "lanes": 6,
        "speed_limit_kmh": 60.0,
        "current_speed_kmh": 36.5,
        "current_vehicles": 1680,
        "capacity": 3200,
        "density": "Moderate",
        "queue_length_meters": 95.0,
        "travel_time_minutes": 9.5,
        "congestion_level": "Moderate",
        "congestion_percent": 52.5,
        "status": "Clear"
    },
    {
        "id": "R-09",
        "name": "West Peripheral Bypass",
        "authority_id": "auth-d",
        "authority_name": "Authority D — West Suburbs & Bypass",
        "coordinates": [[12.9700, 77.5400], [12.9450, 77.5600], [12.9000, 77.5800]],
        "length_meters": 8200.0,
        "lanes": 6,
        "speed_limit_kmh": 70.0,
        "current_speed_kmh": 58.0,
        "current_vehicles": 1250,
        "capacity": 4000,
        "density": "Low",
        "queue_length_meters": 20.0,
        "travel_time_minutes": 8.5,
        "congestion_level": "Free Flowing",
        "congestion_percent": 31.2,
        "status": "Clear"
    }
]
