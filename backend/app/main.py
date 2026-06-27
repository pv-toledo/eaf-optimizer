from fastapi import FastAPI
from app.routers.optimize import optimization_router

app = FastAPI()

app.include_router(optimization_router)
