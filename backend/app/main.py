from fastapi import FastAPI, HTTPException
from schemas import OptimizationRequest
from optimizer import optimize_charged_materials

app = FastAPI()

@app.post("/optimize")
def optimize(req: OptimizationRequest):
    try:
        result = optimize_charged_materials(req.materials, req.constraints)
        return result
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))