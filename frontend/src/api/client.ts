const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiSuccess<T> = {
    ok: true;
    data: T;
};

export type ApiValidationError = {
    ok: false;
    reason: "validation_error";
    detail: string;
};

export type ApiError = {
    ok: false;
    reason: "error";
    detail: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiValidationError | ApiError;

type ApiRequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
};

export async function apiRequest<TResponse>(
    endpoint: string,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<TResponse>> {
    const { method = "GET", body } = options;

    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
            body: body !== undefined ? JSON.stringify(body) : undefined,
        });
    } catch {
        return { ok: false, reason: "error", detail: "Failed to connect to the server." };
    }

    if (response.status === 422) {
        const errorBody = await response.json();
        return { ok: false, reason: "validation_error", detail: errorBody.detail };
    }

    if (!response.ok) {
        return { ok: false, reason: "error", detail: `Erro inesperado (status ${response.status}).` };
    }

    const data: TResponse = await response.json();
    return { ok: true, data };
}