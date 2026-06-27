from pydantic import BaseModel, Field, model_validator

# --- Inputs ---

class SteelComposition(BaseModel):
    c: float
    si: float
    mn: float
    p: float
    s: float
    cu: float
    ni: float

class Cost(BaseModel):
    total: float
    per_ton: float

class Material(BaseModel):
    name: str
    price: float
    metallic_yield: float
    fe: float
    c: float
    si: float
    mn: float
    p: float
    s: float
    cu: float
    ni: float
    sio2: float
    al2o3: float
    cao: float
    mgo: float
    feo: float
    min_fraction: float = Field(default=0.0, ge=0.0, le=1.0)
    max_fraction: float = Field(default=1.0, ge=0.0, le=1.0)

    @model_validator(mode="after")
    def check_bounds(self):
        if self.min_fraction > self.max_fraction:
            raise ValueError(f"min_fraction ({self.min_fraction}) cannot be greater than max_fraction ({self.max_fraction})")
        return self

class Constraints(BaseModel):
    loading_basket_capacity: float
    target_yield: float
    c_min: float
    si_min: float
    mn_min: float
    p_max: float
    s_max: float
    cu_max: float
    ni_max: float

class OptimizationRequest(BaseModel):
    materials: list[Material]
    constraints: Constraints

# --- Outputs ---

class OptimizationResult(BaseModel):
    scrap_mix: dict[str, float]
    liquid_steel: float
    metallic_yield: float
    composition: SteelComposition
    cost: Cost