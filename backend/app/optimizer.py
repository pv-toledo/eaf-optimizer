import pulp as p

materials = [

    {"name": "Pig Iron", "price": 2500, "fe": 94.56, "c": 3.8, "si": 1.0, "mn": 0.5, "p": 0.10, "s": 0.04,  "cu": 0.01, "ni": 0.03, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 0.94 },

    {"name": "HBI (hot briquetted iron)", "price": 2000, "fe": 89.45, "c": 2.10, "si": 0.12, "mn": 0.08, "p": 0.04, "s": 0.01,  "cu": 0.01, "ni": 0.01, "sio2": 1.50, "al2o3": 0.40, "cao": 0.30, "mgo": 0.50, "feo": 5.50,"metallic_yield": 0.90 },

    {"name": "Cast Iron", "price": 1500, "fe": 93.80, "c": 3.50, "si": 2.20, "mn": 0.45, "p": 0.07, "s": 0.05,  "cu": 0.15, "ni": 0.01, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.00, "metallic_yield": 0.88 },

    {"name": "Obsolete Scrap", "price": 1000, "fe": 98.37, "c": 0.18, "si": 0.26, "mn": 0.55, "p": 0.05, "s": 0.10,  "cu": 0.30, "ni": 0.05, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.18, "metallic_yield": 0.85 },

    {"name": "Turnings", "price": 1600, "fe": 97.25, "c": 0.40, "si": 0.20, "mn": 1.10, "p": 0.05, "s": 0.04,  "cu": 0.10, "ni": 0.37, "sio2": 0.00, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10 },

    {"name": "Automotive Stamping Bundles", "price": 2200, "fe": 97.90, "c": 0.05, "si": 0.22, "mn": 0.43, "p": 0.02, "s": 0.01,  "cu": 0.10, "ni": 0.03, "sio2": 1.30, "al2o3": 0.00, "cao": 0.00, "mgo": 0.00, "feo": 0.10, "metallic_yield": 0.92 }
]

eaf_capacity = 120
target_yield = 0.90

c_min =  1.5
si_min = 0.80
mn_min = 0.60
p_limit = 0.09
s_limit = 0.09
cu_limit = 0.70
ni_limit = 0.80

prob = p.LpProblem("eaf_optmizer", p.LpMinimize)

x = {m["name"]: p.LpVariable(m["name"], lowBound=0) for m in materials}

prob += p.lpSum(m["price"] * x[m["name"]] for m in materials)

prob += p.lpSum(x[m["name"]] for m in materials) == eaf_capacity

prob += p.lpSum(m["c"] * x[m["name"]] for m in materials) >= c_min * eaf_capacity
prob += p.lpSum(m["si"] * x[m["name"]] for m in materials) >= si_min * eaf_capacity
prob += p.lpSum(m["mn"] * x[m["name"]] for m in materials) >= mn_min * eaf_capacity
prob += p.lpSum(m["p"] * x[m["name"]] for m in materials) <= p_limit * eaf_capacity
prob += p.lpSum(m["s"] * x[m["name"]] for m in materials) <= s_limit * eaf_capacity
prob += p.lpSum(m["cu"] * x[m["name"]] for m in materials) <= cu_limit * eaf_capacity
prob += p.lpSum(m["ni"] * x[m["name"]] for m in materials) <= ni_limit * eaf_capacity

status = prob.solve()

if p.LpStatus[status] != "Optimal":
    print(f"Solução não encontrada: {p.LpStatus[status]}")
    exit(1)

for m in materials:
    print(f'{m["name"]}: {x[m["name"]].value()} kg')

c_final = sum(m["c"] * x[m["name"]].value() for m in materials)/eaf_capacity
si_final = sum(m["si"] * x[m["name"]].value() for m in materials)/eaf_capacity
mn_final = sum(m["mn"] * x[m["name"]].value() for m in materials)/eaf_capacity
p_final = sum(m["p"] * x[m["name"]].value() for m in materials)/eaf_capacity
s_final = sum(m["s"] * x[m["name"]].value() for m in materials)/eaf_capacity
cu_final = sum(m["cu"] * x[m["name"]].value() for m in materials)/eaf_capacity
ni_final = sum(m["ni"] * x[m["name"]].value() for m in materials)/eaf_capacity

custo_total = sum(m["price"] * x[m["name"]].value() for m in materials)

print(f'C final: {c_final:.3f}%, C mínimo: {c_min:.3f}%')
print(f'Si final: {si_final:.3f}%, Si mínimo: {si_min:.3f}%')
print(f'Mn final: {mn_final:.3f}%, Mn mínimo: {mn_min:.3f}%')
print(f'P final: {p_final:.3f}%, P limite: {p_limit:.3f}%')
print(f'S final: {s_final:.3f}%, S limite: {s_limit:.3f}%')
print(f'Cu final: {cu_final:.3f}%, Cu limite: {cu_limit:.3f}%')
print(f'Ni final: {ni_final:.3f}%, Ni limite: {ni_limit:.3f}%')

print(f'Custo total: {custo_total:.3f}')