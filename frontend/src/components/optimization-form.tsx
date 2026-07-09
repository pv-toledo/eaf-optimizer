"use client";

import { defaultMaterials } from "@/data/materials";
import { formSchema, OptimizationFormData, OptimizationFormInput } from "@/schemas/optimization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ConstraintsSection } from "./constraints-section";
import { MaterialBoundsList } from "./material-bounds-list";

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

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <p className="text-sm text-muted-foreground">Resultado aparece aqui</p>
      </aside>
    </form>
  )
}
