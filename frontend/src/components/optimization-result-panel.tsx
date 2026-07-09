// src/components/optimization-result-panel.tsx
import { FlaskConical, CircleAlert } from "lucide-react";
import { CompositionValue } from "./composition-value";
import { OptimizationResult } from "@/api/optimize";

type OptimizationPanelState =
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; result: OptimizationResult }
    | { status: "infeasible"; detail: string }
    | { status: "error"; detail: string };

export function OptimizationResultPanel({ state }: { state: OptimizationPanelState }) {
    if (state.status === "idle") {
        return (
            <div className="rounded-xl border bg-card p-6 text-center">
                <FlaskConical className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
                <p className="text-sm font-medium">Ajuste as restrições e otimize a carga</p>
                <p className="mt-1 text-xs text-muted-foreground">
                    O resultado com o custo e a mistura de sucata aparece aqui.
                </p>
            </div>
        );
    }

    if (state.status === "loading") {
        return (
            <div className="rounded-xl border bg-card p-4">
                <p className="mb-3 text-sm text-muted-foreground">Otimizando a carga…</p>
                <div className="mb-4 grid grid-cols-2 gap-2">
                    <div className="h-14 animate-pulse rounded-md bg-muted" />
                    <div className="h-14 animate-pulse rounded-md bg-muted" />
                </div>
                <div className="mb-4 flex flex-col gap-2">
                    <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-3/5 animate-pulse rounded bg-muted" />
                    <div className="h-5 w-2/5 animate-pulse rounded bg-muted" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="h-8 animate-pulse rounded bg-muted" />
                    ))}
                </div>
            </div>
        );
    }

    if (state.status === "infeasible" || state.status === "error") {
        return (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex items-start gap-2">
                    <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                    <div>
                        <p className="text-sm font-medium text-destructive">
                            {state.status === "infeasible"
                                ? "Sem mistura viável com essas restrições"
                                : "Não foi possível calcular"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{state.detail}</p>
                    </div>
                </div>
            </div>
        );
    }

    const { result } = state;
    const scrapEntries = Object.entries(result.scrap_mix);

    return (
        <div className="rounded-xl border bg-card p-4">
            <div className="mb-4 grid grid-cols-2 gap-2">
                <div className="rounded-md bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Custo total</p>
                    <p className="text-lg font-medium">
                        R$ {result.cost.total.toLocaleString("pt-BR")}
                    </p>
                </div>
                <div className="rounded-md bg-muted p-3">
                    <p className="text-xs text-muted-foreground">Custo / ton</p>
                    <p className="text-lg font-medium">
                        R$ {result.cost.per_ton.toLocaleString("pt-BR")}
                    </p>
                </div>
            </div>

            <p className="mb-2 text-xs font-medium text-muted-foreground">
                Mistura ({result.liquid_steel.toFixed(1)} ton de aço líquido)
            </p>
            <div className="mb-4 flex flex-col gap-1.5">
                {scrapEntries.map(([name, tons]) => (
                    <div key={name} className="flex items-center justify-between text-xs">
                        <span>{name}</span>
                        <span className="text-muted-foreground">{tons.toFixed(1)} ton</span>
                    </div>
                ))}
            </div>

            <p className="mb-2 text-xs font-medium text-muted-foreground">
                Composição do aço líquido (%)
            </p>
            <div className="grid grid-cols-4 gap-2 text-xs">
                <CompositionValue label="C" value={result.composition.c} />
                <CompositionValue label="Si" value={result.composition.si} />
                <CompositionValue label="Mn" value={result.composition.mn} />
                <CompositionValue label="P" value={result.composition.p} />
                <CompositionValue label="S" value={result.composition.s} />
                <CompositionValue label="Cu" value={result.composition.cu} />
                <CompositionValue label="Ni" value={result.composition.ni} />
            </div>
        </div>
    );
}