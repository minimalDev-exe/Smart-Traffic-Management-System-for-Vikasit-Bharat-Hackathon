from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import (
    simulation,
    traffic,
    authorities,
    optimizer,
    scenarios,
    analytics,
    registration
)

app = FastAPI(
    title="SadakSense Smart City Traffic Management API",
    description="Backend API for Smart City Traffic Management and Simulation (Manthan 4 Yuva Hackathon Submission)",
    version="1.0.0"
)

# Allow CORS from Vite dev server and local clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all modular routers
app.include_router(simulation.router)
app.include_router(traffic.router)
app.include_router(authorities.router)
app.include_router(optimizer.router)
app.include_router(scenarios.router)
app.include_router(analytics.router)
app.include_router(registration.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "SadakSense Traffic Management Platform API",
        "version": "1.0.0",
        "theme": "Smart City",
        "problem_statement": "Uneven distribution of traffic over planning authorities' jurisdictions"
    }
