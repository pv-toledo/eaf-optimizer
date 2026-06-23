import pulp as p

materials = [
    {"name": "shredder", "custo": 0.4, "cu": 0.4, "ni": 0.03},
    {"name": "estamparia", "custo": 0.7, "cu": 0.05, "ni": 0.01},
    {"name": "pacote", "custo": 0.55, "cu": 0.2, "ni": 0.09}
]

eaf_capacity = 120

cu_limit = 0.30

ni_limit = 0.03

prob = p.LpProblem("eaf_optmizer", p.LpMinimize)

x = {m["name"]: p.LpVariable(m["name"], lowBound=0) for m in materials}

prob += p.lpSum(m["custo"] * x[m["name"]] for m in materials)

prob += p.lpSum(x[m["name"]] for m in materials) == eaf_capacity

prob += p.lpSum(m["cu"] * x[m["name"]] for m in materials) <= cu_limit * eaf_capacity

prob += p.lpSum(m["ni"] * x[m["name"]] for m in materials) <= ni_limit * eaf_capacity

status = prob.solve()

print(p.LpStatus[status])

for m in materials: 
    print(f'{m["name"]}: {x[m["name"]].value()} kg')

cu_final = sum(m["cu"] * x[m["name"]].value() for m in materials)/eaf_capacity
ni_final = sum(m["ni"] * x[m["name"]].value() for m in materials)/eaf_capacity

print(f'Cu final: {cu_final:.3f}%, Cu limite: {cu_limit:.3f}%')
print(f'Ni final: {ni_final:.3f}%, Ni limite: {ni_limit:.3f}%')