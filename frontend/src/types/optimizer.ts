export type Material = {
    name: string;
    price: number;

    //All percentages

    metallic_yield: number;

    fe: number;
    c: number;
    si: number;
    mn: number;
    p: number;
    s: number;
    cu: number;
    ni: number;
    sio2: number;
    al2o3: number;
    cao: number;
    mgo: number;
    feo: number;

    min_pct?: number;
    max_pct?: number;
}

export type Constraints = {
    
    loading_basket_capacity: number; //Tons

    //Percentage
    target_yield: number; 

    c_min: number;
    si_min: number;
    mn_min: number;

    p_max: number;
    s_max: number;
    cu_max: number;
    ni_max: number;
}

export type SteelComposition = {
    c: number;
    si: number;
    mn: number;
    p: number;
    s: number;
    cu: number;
    ni: number;
}

export type OptimizationRequest = {
    materials: Material[];
    constraints: Constraints;
}

export type Cost = {
    total: number;
    per_ton: number;
}

export type OptimizationResult = {
    scrap_mix: Record<string, number>; //materialName: tons
    liquid_steel: number;
    metallic_yield: number;
    composition: SteelComposition;
    cost: Cost;
}

