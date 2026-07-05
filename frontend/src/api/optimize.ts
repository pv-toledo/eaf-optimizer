import { apiRequest, ApiResponse } from "@/api/client";
import { Constraints, Material } from "@/types/domain";



export type OptimizationRequest = {
    materials: Material[];
    constraints: Constraints;
};

export type SteelComposition = {
    c: number;
    si: number;
    mn: number;
    p: number;
    s: number;
    cu: number;
    ni: number;
};

export type Cost = {
    total: number;
    per_ton: number;
};

export type OptimizationResult = {
    scrap_mix: Record<string, number>;
    liquid_steel: number;
    metallic_yield: number;
    composition: SteelComposition;
    cost: Cost;
};

export async function optimize(
    request: OptimizationRequest
): Promise<ApiResponse<OptimizationResult>> {
    return apiRequest<OptimizationResult>("/optimize", {
        method: "POST",
        body: request,
    });
}