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
    price: float = Field(gt=0)
    metallic_yield: float = Field(gt=0, le=1)
    fe: float = Field(gt=0, description="percentage (0 to 100%)")
    c: float = Field(gt=0, description="percentage (0 to 100%)")
    si: float = Field(gt=0, description="percentage (0 to 100%)")
    mn: float = Field(gt=0, description="percentage (0 to 100%)")
    p: float = Field(gt=0, description="percentage (0 to 100%)")
    s: float = Field(gt=0, description="percentage (0 to 100%)")
    cu: float = Field(gt=0, description="percentage (0 to 100%)")
    ni: float = Field(gt=0, description="percentage (0 to 100%)")
    sio2: float = Field(gt=0, description="percentage (0 to 100%)")
    al2o3: float = Field(gt=0, description="percentage (0 to 100%)")
    cao: float = Field(gt=0, description="percentage (0 to 100%)")
    mgo: float = Field(gt=0, description="percentage (0 to 100%)")
    feo: float = Field(gt=0, description="percentage (0 to 100%)")
    min_fraction: float = Field(default=0.0, ge=0.0, le=1.0)
    max_fraction: float = Field(default=1.0, ge=0.0, le=1.0)

    @model_validator(mode="after")
    def check_bounds(self):
        if self.min_fraction > self.max_fraction:
            raise ValueError(f"min_fraction ({self.min_fraction}) cannot be greater than max_fraction ({self.max_fraction})")
        return self

class Constraints(BaseModel):
    loading_basket_capacity: float = Field(gt=0)
    target_yield: float = Field(gt=0, le=1, description="Fraction (0 to 1)")
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
    metallic_yield: float
    composition: SteelComposition
    cost: Cost