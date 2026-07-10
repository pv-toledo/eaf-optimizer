"use client";

import { defaultMaterials } from "@/data/materials";
import { formSchema, OptimizationFormData, OptimizationFormInput } from "@/schemas/optimization-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { ConstraintsSection } from "./constraints-section";
import { MaterialBoundsList } from "./material-bounds-list";
import { OptimizationResultPanel } from "./optimization-result-panel";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { formatElementPercent, formatOxidePercent } from "@/lib/format";

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

  const onSubmit = async (data: any) => {
    try {
      // Simula a chamada da API (ex: 2 segundos)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Sucesso
      console.log("Resposta da API simulada com sucesso!", data);

    } catch (error) {
      // Tratamento de erro simulado
      console.error("Erro na API", error);
    }
  };

  console.log(form.formState.errors)

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]"
    >
      <div className="flex flex-col gap-6">
        <ConstraintsSection control={form.control} />
        <MaterialBoundsList control={form.control} fields={fields} materials={defaultMaterials} />
        <Button type="submit" disabled={isSubmitting || !isValid} className="w-full sm:w-auto hover:cursor-pointer">{isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Optimizing...
          </>
        ) : (
          "Optimize charge"
        )}</Button>
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
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
      </aside>


    </form>
  )
}
