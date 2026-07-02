import { OptimizationRequest, OptimizationResult } from "@/types/optimizer";

type OptimizeSuccess = {
    ok: true;
    data: OptimizationResult
}

type OptimizeInfeasible = {
    ok: false;
    reason: "infeasible";
    detail: string
}

type OptimizeError = {
    ok: false;
    reason: "error";
    detail: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export type OptimizeResponse = OptimizeSuccess | OptimizeInfeasible | OptimizeError

export async function optimize (request: OptimizationRequest): Promise<OptimizeResponse> {

    let response: Response

    try {
        response = await fetch(`${API_BASE_URL}/optimize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        })
    } catch {
        return { ok: false, reason: "error", detail: "Server connection failure" };
    }

    if (response.status === 422) {
        const body = await response.json()
        return {ok: false, reason: "infeasible", detail: body.detail}
    }

    if (!response.ok) {
        return {ok: false, reason: "error", detail: `Unexpected error: ${response.status}`}
    }

    const data = await response.json()
    return {ok: true, data}

}