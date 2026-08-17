from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/registration", tags=["registration"])

# In-memory registrations store
REGISTRATIONS: Dict[str, Dict[str, Any]] = {}

@router.post("/submit")
def submit_registration(data: Dict[str, Any]):
    reg_id = f"REG-{str(uuid.uuid4())[:8].upper()}"
    submission = {
        "id": reg_id,
        "theme": data.get("theme", "Smart City"),
        "team_name": data.get("teamName", "TrafficInnovators"),
        "team_lead": data.get("teamLead", {}),
        "members": data.get("members", []),
        "submitted_at": datetime.now().isoformat(),
        "workspace_url": f"/command-center?teamId={reg_id}"
    }
    REGISTRATIONS[reg_id] = submission
    return {
        "success": True,
        "registration_id": reg_id,
        "message": "Team successfully registered for Manthan 4 Yuva Hackathon!",
        "workspace": submission
    }

@router.get("/{reg_id}")
def get_registration(reg_id: str):
    if reg_id not in REGISTRATIONS:
        raise HTTPException(status_code=404, detail="Registration record not found")
    return REGISTRATIONS[reg_id]
