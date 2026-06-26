import pulp as p
from schemas import Material, Constraints, OptimizationResult, SteelComposition, Cost

_raw_materials = [
    {"name": "Pig Iron",                   "price": 2500, "fe": 94.56, "c": 3.8,  "si": 1.00, "mn": 0.50, "p": 0.10, "s": 0.04, "cu": 0.01, "ni": 0.03, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 0.94 },
    {"name": "HBI (hot briquetted iron)",  "price": 2000, "fe": 89.45, "c": 2.10, "si": 0.12, "mn": 0.08, "p": 0.04, "s": 0.01, "cu": 0.01, "ni": 0.01, "sio2": 1.50, "al2o3": 0.40, "cao": 0.30, "mgo": 0.50, "feo": 5.50, "metallic_yield": 0.90 },
    {"name": "Cast Iron",                  "price": 1500, "fe": 93.80, "c": 3.50, "si": 2.20, "mn": 0.45, "p": 0.07, "s": 0.05, "cu": 0.15, "ni": 0.01, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 0.88 },
    {"name": "Obsolete Scrap",             "price": 1000, "fe": 98.37, "c": 0.18, "si": 0.26, "mn": 0.55, "p": 0.05, "s": 0.10, "cu": 0.30, "ni": 0.05, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.18, "metallic_yield": 0.85 },
    {"name": "Turnings",                   "price": 1600, "fe": 97.25, "c": 0.40, "si": 0.20, "mn": 1.10, "p": 0.05, "s": 0.04, "cu": 0.10, "ni": 0.37, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10, "metallic_yield": 0.82 },
    {"name": "Automotive Stamping Bundles","price": 2200, "fe": 97.90, "c": 0.05, "si": 0.22, "mn": 0.43, "p": 0.02, "s": 0.01, "cu": 0.10, "ni": 0.03, "sio2": 1.30, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10, "metallic_yield": 0.92 },
    {"name": "Shredded scrap",             "price": 1500, "fe": 91.50, "c": 0.28, "si": 0.38, "mn": 0.60, "p": 0.03, "s": 0.04, "cu": 0.30, "ni": 0.08, "sio2": 1.30, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.22, "metallic_yield": 0.91 },
]

materials: list[Material] = [Material(**m) for m in _raw_materials]

constraints = Constraints(
    loading_basket_capacity=120,
    target_yield=0.90,
    c_min=1.5,
    si_min=0.80,
    mn_min=0.60,
    p_max=0.09,
    s_max=0.09,
    cu_max=0.70,
    ni_max=0.80,
)


def _val(var: p.LpVariable) -> float:
    v = var.value()
    return v if v is not None else 0.0


def optimize_charged_materials(materials: list[Material], constraints: Constraints) -> OptimizationResult:

    prob = p.LpProblem("eaf_optimizer", p.LpMinimize)

    x = {m.name: p.LpVariable(m.name, lowBound=0) for m in materials}

    # Minimize cost
    prob += p.lpSum(m.price * x[m.name] for m in materials)

    # Max capacity of loading basket
    prob += p.lpSum(x[m.name] for m in materials) == constraints.loading_basket_capacity

    # Mass of liquid steel (applying metallic yield)
    liquid_steel = p.lpSum(m.metallic_yield * x[m.name] for m in materials)

    # Minimum metallic yield
    prob += liquid_steel >= (constraints.loading_basket_capacity * constraints.target_yield)

    # Chemical composition constraints
    prob += p.lpSum(m.c  * x[m.name] for m in materials) >= constraints.c_min  * liquid_steel
    prob += p.lpSum(m.si * x[m.name] for m in materials) >= constraints.si_min * liquid_steel
    prob += p.lpSum(m.mn * x[m.name] for m in materials) >= constraints.mn_min * liquid_steel
    prob += p.lpSum(m.p  * x[m.name] for m in materials) <= constraints.p_max  * liquid_steel
    prob += p.lpSum(m.s  * x[m.name] for m in materials) <= constraints.s_max  * liquid_steel
    prob += p.lpSum(m.cu * x[m.name] for m in materials) <= constraints.cu_max * liquid_steel
    prob += p.lpSum(m.ni * x[m.name] for m in materials) <= constraints.ni_max * liquid_steel

    status = prob.solve()
    if p.LpStatus[status] != "Optimal":
        raise ValueError(f"Optimization failed: {p.LpStatus[status]}")

    vals = {m.name: _val(x[m.name]) for m in materials}

    liquid_steel_ton = sum(m.metallic_yield * vals[m.name] for m in materials if vals[m.name] > 0.0)

    c_final  = sum(m.c  * vals[m.name] for m in materials) / liquid_steel_ton
    si_final = sum(m.si * vals[m.name] for m in materials) / liquid_steel_ton
    mn_final = sum(m.mn * vals[m.name] for m in materials) / liquid_steel_ton
    p_final  = sum(m.p  * vals[m.name] for m in materials) / liquid_steel_ton
    s_final  = sum(m.s  * vals[m.name] for m in materials) / liquid_steel_ton
    cu_final = sum(m.cu * vals[m.name] for m in materials) / liquid_steel_ton
    ni_final = sum(m.ni * vals[m.name] for m in materials) / liquid_steel_ton

    total_cost = sum(m.price * vals[m.name] for m in materials)

    return OptimizationResult(
        scrap_mix={m.name: vals[m.name] for m in materials if vals[m.name] > 0.0},
        liquid_steel=liquid_steel_ton,
        yield_=liquid_steel_ton / constraints.loading_basket_capacity,
        composition=SteelComposition(
            c=c_final,
            si=si_final,
            mn=mn_final,
            p=p_final,
            s=s_final,
            cu=cu_final,
            ni=ni_final,
        ),
        cost=Cost(
            total=total_cost,
            per_ton=total_cost / liquid_steel_ton,
        ),
    )


if __name__ == "__main__":
    result = optimize_charged_materials(materials, constraints)

    print("\n--- Scrap mix ---")
    for name, kg in result.scrap_mix.items():
        print(f"  {name}: {kg:.2f} ton")

    print(f"\n--- Mass balance ---")
    print(f"  Liquid steel: {result.liquid_steel:.2f} ton")
    print(f"  Yield:        {result.yield_ * 100:.1f}%")

    print(f"\n--- Composition ---")
    for element, value in result.composition.model_dump().items():
        print(f"  {element}: {value:.2f}%")

    print(f"\n--- Cost ---")
    print(f"  Total:   US$ {result.cost.total:.2f}")
    print(f"  Per ton: US$ {result.cost.per_ton:.2f}")
