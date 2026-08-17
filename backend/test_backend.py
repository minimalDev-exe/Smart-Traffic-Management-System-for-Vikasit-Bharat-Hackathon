import sys
from backend.main import app
from backend.engine.imbalance import calculate_imbalance_score
from backend.engine.city_grid import PLANNING_AUTHORITIES

print("Testing RoadFlow Backend...")
print(f"Title: {app.title}")
print(f"Routes registered: {len(app.routes)}")

# Test Imbalance Score
res = calculate_imbalance_score(PLANNING_AUTHORITIES)
print(f"Baseline Imbalance Score: {res['score']}/100 ({res['classification']})")
print(f"Explanation: {res['explanation']}")
print("Backend verification test PASSED!")
