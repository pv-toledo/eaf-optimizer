import pulp as p
from app.schemas import Material, Constraints, OptimizationResult, SteelComposition, Cost


def _val(var: p.LpVariable) -> float:
    v = var.value()
    return v if v is not None else 0.0


def optimize_charged_materials(materials: list[Material], constraints: Constraints) -> OptimizationResult:

    prob = p.LpProblem("eaf_optimizer", p.LpMinimize)

    x = {
        m.name: p.LpVariable(
            m.name,
            lowBound=(m.min_pct / 100) * constraints.loading_basket_capacity,
            upBound=(m.max_pct / 100) * constraints.loading_basket_capacity,
        )
        for m in materials
    }

    # Minimize cost
    prob += p.lpSum(m.price * x[m.name] for m in materials)

    # Max capacity of loading basket
    prob += p.lpSum(x[m.name] for m in materials) == constraints.loading_basket_capacity

    # Mass of liquid steel (applying metallic yield)
    liquid_steel = p.lpSum((m.metallic_yield/100) * x[m.name] for m in materials)

    # Minimum metallic yield
    prob += liquid_steel >= (constraints.loading_basket_capacity * (constraints.target_yield/100))

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

    liquid_steel_ton = sum((m.metallic_yield/100) * vals[m.name] for m in materials if vals[m.name] > 0.0)

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
        metallic_yield=(liquid_steel_ton / constraints.loading_basket_capacity)*100,
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


# if __name__ == "__main__":
#     result = optimize_charged_materials(materials, constraints)

#     print("\n--- Scrap mix ---")
#     for name, kg in result.scrap_mix.items():
#         print(f"  {name}: {kg:.2f} ton")

#     print("\n--- Mass balance ---")
#     print(f"  Liquid steel: {result.liquid_steel:.2f} ton")
#     print(f"  Metallic yield: {result.metallic_yield * 100:.1f}%")

#     print("\n--- Composition ---")
#     for element, value in result.composition.model_dump().items():
#         print(f"  {element}: {value:.2f}%")

#     print("\n--- Cost ---")
#     print(f"  Total:   US$ {result.cost.total:.2f}")
#     print(f"  Per ton: US$ {result.cost.per_ton:.2f}")
