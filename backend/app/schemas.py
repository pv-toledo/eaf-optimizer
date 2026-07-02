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

#All percentages

class Material(BaseModel):
    name: str
    price: float = Field(gt=0)
    metallic_yield: float = Field(gt=0, le=100)
    fe: float = Field(ge=0)
    c: float = Field(ge=0)
    si: float = Field(ge=0)
    mn: float = Field(ge=0)
    p: float = Field(ge=0)
    s: float = Field(ge=0)
    cu: float = Field(ge=0)
    ni: float = Field(ge=0)
    sio2: float = Field(ge=0)
    al2o3: float = Field(ge=0)
    cao: float = Field(ge=0)
    mgo: float = Field(ge=0)
    feo: float = Field(ge=0)
    min_pct: float = Field(default=0.0, ge=0.0, le=100.0)
    max_pct: float = Field(default=100.0, ge=0.0, le=100.0)

    @model_validator(mode="after")
    def check_bounds(self):
        if self.min_pct > self.max_pct:
            raise ValueError(f"min_pct ({self.min_pct}) cannot be greater than max_pct ({self.max_pct})")
        return self

class Constraints(BaseModel):
    loading_basket_capacity: float = Field(gt=0)
    target_yield: float = Field(gt=0, le=100, description="Percentage (0 to 100%)")
    c_min: float = Field(gt=0)
    si_min: float = Field(gt=0)
    mn_min: float = Field(gt=0)
    p_max: float = Field(gt=0)
    s_max: float = Field(gt=0)
    cu_max: float = Field(gt=0)
    ni_max: float = Field(gt=0)

class OptimizationRequest(BaseModel):
    materials: list[Material]
    constraints: Constraints

    @model_validator(mode="after")
    def unique_names(self):
        names = [m.name for m in self.materials]
        if len(names) != len(set(names)):
            raise ValueError("Material names must be unique")
        return self

# --- Outputs ---

class OptimizationResult(BaseModel):
    scrap_mix: dict[str, float]
    liquid_steel: float
    metallic_yield: float = Field(gt=0, le=100)
    composition: SteelComposition
    cost: Cost