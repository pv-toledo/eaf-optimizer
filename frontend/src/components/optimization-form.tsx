"use client";

import { defaultConstraints, defaultMaterials } from "@/data/materials";
import { formSchema, OptimizationFormData, OptimizationFormInput } from "@/schemas/optimization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
      <Controller
        control={form.control}
        name="constraints.loading_basket_capacity"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Loading Basket Capacity</FieldLabel>
            <Input
              id={field.name}
              type="number"
              {...field}
              value={Number.isNaN(field.value) ? "" : field.value}
              onChange={(e) => field.onChange(Number(e.target.valueAsNumber))}
              aria-invalid = {fieldState.invalid}
            />
            <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
            
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="constraints.target_yield"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Target Yield (%)</FieldLabel>
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
      <Controller
        control={form.control}
        name="constraints.c_min"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Minimum C (%)</FieldLabel>
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
      <Controller
        control={form.control}
        name="constraints.mn_min"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Minimum Mn (%)</FieldLabel>
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
      <Controller
        control={form.control}
        name="constraints.si_min"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Minimum Si (%)</FieldLabel>
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
      <Controller
        control={form.control}
        name="constraints.p_max"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Maximum P (%)</FieldLabel>
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
      <Controller
        control={form.control}
        name="constraints.s_max"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Maximum S (%)</FieldLabel>
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
      <Controller
        control={form.control}
        name="constraints.cu_max"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Maximum Cu (%)</FieldLabel>
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
      <Controller
        control={form.control}
        name="constraints.ni_max"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Maximum Ni (%)</FieldLabel>
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
      <Button type="submit">Submeter</Button>

    </form>
  )
}
