import math
from typing import List, Dict, Any

def calculate_imbalance_score(authorities: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Calculates the exact, deterministic Traffic Distribution Imbalance Score (0 - 100).
    
    Inputs:
      authorities: list of authority objects with:
        - road_utilization_percent (0 - 100)
        - traffic_share_percent (0 - 100, sums to ~100)
        - name (str)
        
    Formula:
      1. Utilization Standard Deviation Component (C_std, weight: 35%)
         sigma_U = sqrt( sum( (U_i - mean_U)^2 ) / N )
         Normalized against max expected std dev (35.0) -> C_std = min(100, (sigma_U / 35.0) * 100)
         
      2. Max/Min Utilization Spread Component (C_spread, weight: 25%)
         delta_U = max(U_i) - min(U_i)
         Normalized against max expected spread (70.0) -> C_spread = min(100, (delta_U / 70.0) * 100)
         
      3. Bottleneck Severity Ratio (C_bottleneck, weight: 25%)
         If max(U_i) > 70%:
           C_bottleneck = min(100, ((max(U_i) - 70.0) / 30.0) * 100 * 1.25)
         Else:
           0
           
      4. Traffic Share Disparity (C_share, weight: 15%)
         Ideal fair share for N authorities = 100% / N (e.g. 25% for 4 authorities)
         disparity = sum( abs(S_i - ideal_share) ) / 2
         Normalized against max disparity (40.0) -> C_share = min(100, (disparity / 40.0) * 100)
         
      Composite Imbalance Score:
         I = round( 0.35 * C_std + 0.25 * C_spread + 0.25 * C_bottleneck + 0.15 * C_share )
         Clamped to [0, 100].
    """
    if not authorities or len(authorities) < 2:
        return {
            "score": 0,
            "classification": "OPTIMAL",
            "explanation": "Insufficient authority data to compute imbalance.",
            "utilization_std_dev": 0.0,
            "max_min_spread_percent": 0.0,
            "bottleneck_penalty": 0.0,
            "traffic_share_disparity": 0.0,
            "highest_loaded_authority": "",
            "lowest_loaded_authority": ""
        }

    n = len(authorities)
    utilizations = [float(a.get("road_utilization_percent", 0.0)) for a in authorities]
    shares = [float(a.get("traffic_share_percent", 0.0)) for a in authorities]
    names = [a.get("name", f"Authority {i+1}") for i, a in enumerate(authorities)]

    # 1. Mean and Standard Deviation of Utilization
    mean_u = sum(utilizations) / n
    variance_u = sum((u - mean_u) ** 2 for u in utilizations) / n
    std_u = math.sqrt(variance_u)
    c_std = min(100.0, (std_u / 35.0) * 100.0)

    # 2. Max - Min Spread
    max_u = max(utilizations)
    min_u = min(utilizations)
    spread_u = max_u - min_u
    c_spread = min(100.0, (spread_u / 70.0) * 100.0)

    # 3. Bottleneck Penalty
    if max_u > 70.0:
        c_bottleneck = min(100.0, ((max_u - 70.0) / 30.0) * 100.0 * 1.25)
    else:
        c_bottleneck = 0.0

    # 4. Traffic Share Disparity
    ideal_share = 100.0 / n
    disparity = sum(abs(s - ideal_share) for s in shares) / 2.0
    c_share = min(100.0, (disparity / 40.0) * 100.0)

    # Weighted Composite Score
    raw_score = (0.35 * c_std) + (0.25 * c_spread) + (0.25 * c_bottleneck) + (0.15 * c_share)
    score = max(0, min(100, int(round(raw_score))))

    max_idx = utilizations.index(max_u)
    min_idx = utilizations.index(min_u)
    highest_auth = names[max_idx]
    lowest_auth = names[min_idx]

    # Classification & Narrative Explanation
    if score <= 30:
        classification = "OPTIMAL"
        explanation = f"Traffic is evenly distributed across all jurisdictions ({highest_auth}: {max_u:.0f}%, {lowest_auth}: {min_u:.0f}% utilization). Network capacity is well balanced."
    elif score <= 60:
        classification = "MODERATE IMBALANCE"
        explanation = f"Mild traffic concentration detected in {highest_auth} ({max_u:.0f}% utilization) compared to {lowest_auth} ({min_u:.0f}%). Localized tuning recommended."
    elif score <= 80:
        classification = "HIGH IMBALANCE"
        explanation = f"Significant cross-authority disparity: {highest_auth} is overloaded at {max_u:.0f}% road utilization, while {lowest_auth} operates at only {min_u:.0f}%. Cross-jurisdictional load balancing required."
    else:
        classification = "CRITICAL CRISIS"
        explanation = f"Severe jurisdictional bottleneck in {highest_auth} ({max_u:.0f}% utilization, queue spillback active) while peripheral zones ({lowest_auth}: {min_u:.0f}%) hold idle capacity. Urgent AI intervention needed."

    return {
        "score": score,
        "classification": classification,
        "explanation": explanation,
        "utilization_std_dev": round(std_u, 1),
        "max_min_spread_percent": round(spread_u, 1),
        "bottleneck_penalty": round(c_bottleneck, 1),
        "traffic_share_disparity": round(disparity, 1),
        "highest_loaded_authority": highest_auth,
        "lowest_loaded_authority": lowest_auth
    }
