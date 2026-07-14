import { FlaskConical, CircleAlert } from "lucide-react";
import { CompositionValue } from "./composition-value";
import { OptimizationResult } from "@/api/optimize";
import { formatChargePercent, formatCurrency, formatElementPercent, formatTons } from "@/lib/format";

export type OptimizationPanelState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; result: OptimizationResult }
  | { status: "infeasible"; detail: string }
  | { status: "error"; detail: string };

export function OptimizationResultPanel({
  state,
  onIdleClick,
}: {
  state: OptimizationPanelState;
  onIdleClick?: () => void;
}) {
  if (state.status === "idle") {
    return (
      <div className="rounded-xl border bg-card p-6 text-center">
        <FlaskConical className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
        <p className="text-sm font-medium">
          Defaults are pre-filled for a typical heat
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Click{" "}
          <button
            type="button"
            onClick={onIdleClick}
            className="cursor-pointer font-medium text-foreground underline-offset-2 hover:underline lg:cursor-default lg:pointer-events-none lg:hover:no-underline"
          >
            "Optimize charge"
          </button>{" "}
          to see the cost-optimal mix — no changes needed to get started.
        </p>
      </div>
    );
  }

  if (state.status === "loading") {
    return (
      <div className="rounded-xl border bg-card p-4">
        <p className="mb-3 text-sm text-muted-foreground">
          Optimizing the charge…
        </p>
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
                ? "No feasible mix found with current constraints"
                : "Unable to calculate"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{state.detail}</p>
          </div>
        </div>
      </div>
    );
  }

  const { result } = state;
  const scrapEntries = Object.entries(result.scrap_mix);
  const totalTons = scrapEntries.reduce((sum, [, tons]) => sum + tons, 0);

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-md bg-muted p-3">
          <p className="text-xs text-muted-foreground">Total cost</p>
          <p className="text-lg font-medium">
            {formatCurrency(result.cost.total)}
          </p>
        </div>
        <div className="rounded-md bg-muted p-3">
          <p className="text-xs text-muted-foreground">Cost per ton of steel</p>
          <p className="text-lg font-medium">
            {formatCurrency(result.cost.per_ton)}
          </p>
        </div>
      </div>

      <p className="mb-2 text-xs font-medium text-muted-foreground">
        {result.liquid_steel.toFixed(1)} tons of liquid steel · Yield: {formatChargePercent(result.metallic_yield)}
      </p>
      <div className="mb-4 flex flex-col gap-1.5">
        {scrapEntries.map(([name, tons]) => (
          <div key={name} className="flex items-center justify-between text-xs">
            <span>{name}</span>
            <span className="text-muted-foreground">
              {formatTons(tons)} (
              {formatChargePercent((tons / totalTons) * 100)})
            </span>
          </div>
        ))}
      </div>

      <p className="mb-2 text-xs font-medium text-muted-foreground">
        Liquid steel composition (%)
      </p>
      <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <CompositionValue
          label="C: "
          value={formatElementPercent(result.composition.c)}
        />
        <CompositionValue
          label="Si: "
          value={formatElementPercent(result.composition.si)}
        />
        <CompositionValue
          label="Mn: "
          value={formatElementPercent(result.composition.mn)}
        />
        <CompositionValue
          label="P: "
          value={formatElementPercent(result.composition.p)}
        />
        <CompositionValue
          label="S: "
          value={formatElementPercent(result.composition.s)}
        />
        <CompositionValue
          label="Cu: "
          value={formatElementPercent(result.composition.cu)}
        />
        <CompositionValue
          label="Ni: "
          value={formatElementPercent(result.composition.ni)}
        />
      </div>
    </div>
  );
}
