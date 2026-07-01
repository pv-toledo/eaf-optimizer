from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.optimize import optimization_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["http://localhost:3000"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

app.include_router(optimization_router)
