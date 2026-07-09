"use client";

import { defaultMaterials } from "@/data/materials";
import { formSchema, OptimizationFormData, OptimizationFormInput } from "@/schemas/optimization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ConstraintsSection } from "./constraints-section";
import { MaterialBoundsList } from "./material-bounds-list";
import { OptimizationResultPanel } from "./optimization-result-panel";

export function OptimizationForm() {
  const form = useForm<OptimizationFormInput, unknown, OptimizationFormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      constraints: {
        loading_basket_capacity: 120,
        target_yield: 85,
        c_min: 0,
        si_min: 0,
        mn_min: 0,
        p_max: 0,
        s_max: 0,
        cu_max: 0,
        ni_max: 0,
      },
      materialBounds: defaultMaterials.map((m) => ({
        name: m.name,
        min_pct: m.min_pct ?? 0,
        max_pct: m.max_pct ?? 100,
      }))
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "materialBounds",
  });

  return (
    <form
      onSubmit={form.handleSubmit((data) => console.log(data))}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]"
    >
      <div className="flex flex-col gap-6">
        <ConstraintsSection control={form.control} />
        <MaterialBoundsList control={form.control} fields={fields} materials={defaultMaterials} />
        <Button type="submit">Otimizar carga</Button>
      </div>

      {/* <aside className="lg:sticky lg:top-8 lg:self-start">
        <p className="text-sm text-muted-foreground">Resultado aparece aqui</p>
      </aside> */}

      <OptimizationResultPanel state={{
    status: "success",
    result: {
        scrap_mix: {
            "Sucata pesada": 45.2,
            "Estamparia": 30.8,
            "Ferro-gusa": 12.5,
        },
        liquid_steel: 82.3,
        metallic_yield: 91.4,
        composition: {
            c: 0.18,
            si: 0.02,
            mn: 0.35,
            p: 0.021,
            s: 0.018,
            cu: 0.09,
            ni: 0.04,
        },
        cost: {
            total: 187450,
            per_ton: 2277.5,
        },
    },
}} />
    </form>
  )
}
