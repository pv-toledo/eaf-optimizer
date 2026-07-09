import { OptimizationFormInput } from "@/schemas/optimization-form"
import { Control } from "react-hook-form"
import { NumberField } from "./number-field"

type ConstraintsSectionProps = {
    control: Control<OptimizationFormInput>
}

export function ConstraintsSection ({control}: ConstraintsSectionProps) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Forno</p>
            <div className="grid grid-cols-2 gap-3">
                <NumberField
                    control={control}
                    name="constraints.loading_basket_capacity"
                    label="Capacidade do cesto (ton)"
                />
                <NumberField
                    control={control}
                    name="constraints.target_yield"
                    label="Rendimento metálico alvo (%)"
                />
            </div>

            <p className="mb-3 mt-4 text-sm font-medium text-muted-foreground">
                Composição mínima
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <NumberField control={control} name="constraints.c_min" label="C mínimo (%)" />
                <NumberField control={control} name="constraints.si_min" label="Si mínimo (%)" />
                <NumberField control={control} name="constraints.mn_min" label="Mn mínimo (%)" />
            </div>

            <p className="mb-3 mt-4 text-sm font-medium text-muted-foreground">
                Composição máxima
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <NumberField control={control} name="constraints.p_max" label="P máximo (%)" />
                <NumberField control={control} name="constraints.s_max" label="S máximo (%)" />
                <NumberField control={control} name="constraints.cu_max" label="Cu máximo (%)" />
                <NumberField control={control} name="constraints.ni_max" label="Ni máximo (%)" />
            </div>
        </div>
    )
}