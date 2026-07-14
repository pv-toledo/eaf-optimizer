"use client";

import { defaultMaterials } from "@/data/materials";
import { formSchema, OptimizationFormData, OptimizationFormInput } from "@/schemas/optimization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ConstraintsSection } from "./constraints-section";
import { MaterialBoundsList } from "./material-bounds-list";
import { OptimizationPanelState, OptimizationResultPanel } from "./optimization-result-panel";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatElementPercent, formatOxidePercent } from "@/lib/format";
import { buildOptimizationRequest, optimize } from "@/api/optimize";

export function OptimizationForm() {
  const form = useForm<OptimizationFormInput, unknown, OptimizationFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      constraints: {
        loading_basket_capacity: formatOxidePercent(120),
        target_yield: formatOxidePercent(85),
        c_min: formatElementPercent(0.550),
        si_min: formatElementPercent(0.150),
        mn_min: formatElementPercent(0.400),
        p_max: formatElementPercent(0.050),
        s_max: formatElementPercent(0.060),
        cu_max: formatElementPercent(0.300),
        ni_max: formatElementPercent(0.150),
      },
      materialBounds: defaultMaterials.map((m) => ({
        name: m.name,
        min_pct: m.min_pct ?? 0,
        max_pct: m.max_pct ?? 100,
      }))
    },
  });

  useEffect(() => {
    form.trigger()
  }, [form])

  const { fields } = useFieldArray({
    control: form.control,
    name: "materialBounds",
  });

  const { isSubmitting, isValid } = form.formState

  const [panelState, setPanelState] = useState<OptimizationPanelState>({ status: "idle" });
  const resultPanelRef = useRef<HTMLElement>(null);

  const onSubmit = async (data: OptimizationFormData) => {
    setPanelState({ status: "loading" });

    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      resultPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    let request;
    try {
      request = buildOptimizationRequest(data);
    } catch (error) {
      console.error(error);
      setPanelState({
        status: "error",
        detail: "Internal error while preparing the request.",
      });
      return;
    }

    const response = await optimize(request);

    if (response.ok) {
      setPanelState({ status: "success", result: response.data });
      return;
    }

    if (response.reason === "validation_error") {
      setPanelState({ status: "infeasible", detail: response.detail });
      return;
    }

    setPanelState({ status: "error", detail: response.detail });
  };

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleIdleClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      submitButtonRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]"
    >
      <div className="order-2 flex flex-col gap-6 lg:order-1">
        <ConstraintsSection control={form.control} />
        <MaterialBoundsList control={form.control} fields={fields} materials={defaultMaterials} />
        <Button
          type="submit"
          ref={submitButtonRef}
          disabled={isSubmitting || !isValid}
          className="w-full sm:w-auto hover:cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Optimizing...
            </>
          ) : (
            "Optimize charge"
          )}
        </Button>
      </div>

      <aside ref={resultPanelRef} className="order-1 lg:order-2 lg:sticky lg:top-8 lg:self-start">
        <OptimizationResultPanel state={panelState} onIdleClick={handleIdleClick} />
      </aside>
    </form>
  )
}