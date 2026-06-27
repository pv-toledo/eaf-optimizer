from fastapi import APIRouter, HTTPException

from app.schemas import OptimizationResult, OptimizationRequest
from app.services.optimizer import optimize_charged_materials

optimization_router = APIRouter()

@optimization_router.post("/optimize", response_model=OptimizationResult)
def optimize(req: OptimizationRequest):
    try:
        result = optimize_charged_materials(req.materials, req.constraints)
        return result
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    