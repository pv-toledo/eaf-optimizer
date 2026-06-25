import pulp as p

materials = [

    {"name": "Pig Iron",                   "price": 2500, "fe": 94.56, "c": 3.8,  "si": 1.00, "mn": 0.50, "p": 0.10, "s": 0.04, "cu": 0.01, "ni": 0.03, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 0.94 },

    {"name": "HBI (hot briquetted iron)",  "price": 2000, "fe": 89.45, "c": 2.10, "si": 0.12, "mn": 0.08, "p": 0.04, "s": 0.01, "cu": 0.01, "ni": 0.01, "sio2": 1.50, "al2o3": 0.40, "cao": 0.30, "mgo": 0.50, "feo": 5.50, "metallic_yield": 0.90 },

    {"name": "Cast Iron",                  "price": 1500, "fe": 93.80, "c": 3.50, "si": 2.20, "mn": 0.45, "p": 0.07, "s": 0.05, "cu": 0.15, "ni": 0.01, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 0.88 },

    {"name": "Obsolete Scrap",             "price": 1000, "fe": 98.37, "c": 0.18, "si": 0.26, "mn": 0.55, "p": 0.05, "s": 0.10, "cu": 0.30, "ni": 0.05, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.18, "metallic_yield": 0.85 },

    {"name": "Turnings",                   "price": 1600, "fe": 97.25, "c": 0.40, "si": 0.20, "mn": 1.10, "p": 0.05, "s": 0.04, "cu": 0.10, "ni": 0.37, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10, "metallic_yield": 0.82 },

    {"name": "Automotive Stamping Bundles","price": 2200, "fe": 97.90, "c": 0.05, "si": 0.22, "mn": 0.43, "p": 0.02, "s": 0.01, "cu": 0.10, "ni": 0.03, "sio2": 1.30, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10, "metallic_yield": 0.92 }
]

loading_basket_capacity = 120
target_yield     = 0.90 

c_min  = 1.5
si_min = 0.80
mn_min = 0.60
p_max  = 0.09
s_max  = 0.09
cu_max = 0.70
ni_max = 0.80

prob = p.LpProblem("eaf_optimizer", p.LpMinimize)

x = {m["name"]: p.LpVariable(m["name"], lowBound=0) for m in materials}

# Minimize cost
prob += p.lpSum(m["price"] * x[m["name"]] for m in materials)

# Max capacity of loading
prob += p.lpSum(x[m["name"]] for m in materials) == loading_basket_capacity

# Mass of liquid steel (applying metallic yield)
liquid_steel = p.lpSum(m["metallic_yield"] * x[m["name"]] for m in materials)

# Minimum metallic yield
prob += liquid_steel >= (loading_basket_capacity * target_yield)

# Chemical composition constraints 

prob += p.lpSum(m["c"]  * x[m["name"]] for m in materials) >= c_min  * liquid_steel
prob += p.lpSum(m["si"] * x[m["name"]] for m in materials) >= si_min * liquid_steel
prob += p.lpSum(m["mn"] * x[m["name"]] for m in materials) >= mn_min * liquid_steel
prob += p.lpSum(m["p"]  * x[m["name"]] for m in materials) <= p_max  * liquid_steel
prob += p.lpSum(m["s"]  * x[m["name"]] for m in materials) <= s_max  * liquid_steel
prob += p.lpSum(m["cu"] * x[m["name"]] for m in materials) <= cu_max * liquid_steel
prob += p.lpSum(m["ni"] * x[m["name"]] for m in materials) <= ni_max * liquid_steel

status = prob.solve()

if p.LpStatus[status] != "Optimal":
    print(f"Solução não encontrada: {p.LpStatus[status]}")
    exit(1)

liquid_steel_kg = sum(m["metallic_yield"] * x[m["name"]].value() for m in materials)

print(f"\n--- Cargas ---")
for m in materials:
    val = x[m["name"]].value()
    if val and val > 0.01:
        print(f'  {m["name"]}: {val:.2f} kg')

print(f"\n--- Balanço de massa ---")
print(f"  Cesta total:   {sum(x[m['name']].value() for m in materials):.2f} kg")
print(f"  Aço líquido:   {liquid_steel_kg:.2f} kg")
print(f"  Rendimento:    {liquid_steel_kg / loading_basket_capacity * 100:.1f}%")

c_final  = sum(m["c"]  * x[m["name"]].value() for m in materials) / liquid_steel_kg
si_final = sum(m["si"] * x[m["name"]].value() for m in materials) / liquid_steel_kg
mn_final = sum(m["mn"] * x[m["name"]].value() for m in materials) / liquid_steel_kg
p_final  = sum(m["p"]  * x[m["name"]].value() for m in materials) / liquid_steel_kg
s_final  = sum(m["s"]  * x[m["name"]].value() for m in materials) / liquid_steel_kg
cu_final = sum(m["cu"] * x[m["name"]].value() for m in materials) / liquid_steel_kg
ni_final = sum(m["ni"] * x[m["name"]].value() for m in materials) / liquid_steel_kg

print(f"\n--- Composição no aço líquido ---")
print(f"  C:  {c_final:.3f}%  (mín {c_min:.3f}%)")
print(f"  Si: {si_final:.3f}%  (mín {si_min:.3f}%)")
print(f"  Mn: {mn_final:.3f}%  (mín {mn_min:.3f}%)")
print(f"  P:  {p_final:.3f}%  (máx {p_max:.3f}%)")
print(f"  S:  {s_final:.3f}%  (máx {s_max:.3f}%)")
print(f"  Cu: {cu_final:.3f}%  (máx {cu_max:.3f}%)")
print(f"  Ni: {ni_final:.3f}%  (máx {ni_max:.3f}%)")

custo_total = sum(m["price"] * x[m["name"]].value() for m in materials)
print(f"\n  Custo total: R$ {custo_total:.2f}")
print(f"  Custo/t aço líquido: R$ {custo_total / liquid_steel_kg :.2f}")
