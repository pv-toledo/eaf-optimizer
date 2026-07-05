"use client";

import { materials } from "@/data/materials";
import { formSchema, OptimizationFormData } from "@/schemas/optimization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export function OptimizationForm() {
  const form = useForm<OptimizationFormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      constraints: {
        loading_basket_capacity: 120,
        target_yield: 0,
        c_min: 0,
        si_min: 0,
        mn_min: 0,
        p_max: 0,
        s_max: 0,
        cu_max: 0,
        ni_max: 0,
      },
      materialBounds: materials.map((m) => ({
        name: m.name,
        min_pct: m.min_pct ?? 0,
        max_pct: m.max_pct ?? 100,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "materialBounds",
  });

  return (
    <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
        <Controller
            control={form.control}
            name="constraints.loading_basket_capacity"
            render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Loading Basket Capacity</FieldLabel>
                    <Input
                        id={field.name}
                        type="number"
                        {...field}
                        value={Number.isNaN(field.value) ? "" : field.value}
                        onChange={(e) => field.onChange(Number(e.target.valueAsNumber))}
                    />
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                </Field>
            )}
        />

    </form>
  )
}
