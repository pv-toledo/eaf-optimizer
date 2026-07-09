"use client";

import { defaultMaterials } from "@/data/materials";
import { formSchema, OptimizationFormData, OptimizationFormInput } from "@/schemas/optimization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { NumberField } from "./number-field";

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
    <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
      <NumberField
        control={form.control}
        name="constraints.loading_basket_capacity"
        label="Capacidade do cesto (ton)"
      />
      <NumberField
        control={form.control}
        name="constraints.target_yield"
        label="Rendimento metálico alvo (%)"
      />
      <NumberField
        control={form.control}
        name="constraints.c_min"
        label="C mínimo (%)"
      />
      <NumberField
        control={form.control}
        name="constraints.si_min"
        label="Si mínimo (%)"
      />
      <NumberField
        control={form.control}
        name="constraints.mn_min"
        label="Mn mínimo (%)"
      />
      <NumberField
        control={form.control}
        name="constraints.p_max"
        label="P máximo (%)"
      />
      <NumberField
        control={form.control}
        name="constraints.s_max"
        label="S máximo (%)"
      />
      <NumberField
        control={form.control}
        name="constraints.cu_max"
        label="Cu máximo (%)"
      />
      <NumberField
        control={form.control}
        name="constraints.ni_max"
        label="Ni máximo (%)"
      />

      {fields.map((fieldItem, index) => (
        <div key={fieldItem.id}>
          <p>{fieldItem.name}</p>
          <NumberField
            control={form.control}
            name={`materialBounds.${index}.min_pct`}
            label="Mínimo (%)"
          />
          <NumberField
            control={form.control}
            name={`materialBounds.${index}.max_pct`}
            label="Máximo (%)"
          />
        </div>
      ))}
      
      <Button type="submit">Submeter</Button>

    </form>
  )
}
