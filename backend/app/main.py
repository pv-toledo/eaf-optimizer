import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.optimize import optimization_router

app = FastAPI()

allowed_origins = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

app.include_router(optimization_router)

@app.get("/health")
def health_check():
    return {"status": "ok"}