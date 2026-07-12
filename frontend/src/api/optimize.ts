import { apiRequest, ApiResponse } from "@/api/client";
import { defaultMaterials } from "@/data/materials";
import { OptimizationFormData } from "@/schemas/optimization-form";
import { Constraints, Material } from "@/types/domain";



export type OptimizationRequest = {
    materials: Material[];
    constraints: Constraints;
};

export function buildOptimizationRequest(
    data: OptimizationFormData
): OptimizationRequest {
    const materials: Material[] = data.materialBounds.map((bound) => {
        const catalogMaterial = defaultMaterials.find((m) => m.name === bound.name);

        if (!catalogMaterial) {
            throw new Error(`Material "${bound.name}" not found in catalog.`);
        }

        return {
            ...catalogMaterial,
            min_pct: bound.min_pct,
            max_pct: bound.max_pct,
        };
    });

    return {
        materials,
        constraints: data.constraints,
    };
}

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