import { OptimizationFormInput } from "@/schemas/optimization-form"
import { Control } from "react-hook-form"
import { NumberField } from "./number-field"

type ConstraintsSectionProps = {
    control: Control<OptimizationFormInput>
}

export function ConstraintsSection ({control}: ConstraintsSectionProps) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <p className="mb-3 text-sm font-medium text-muted-foreground">Electric Arc Furnace</p>
            <div className="grid grid-cols-2 gap-3">
                <NumberField
                    control={control}
                    name="constraints.loading_basket_capacity"
                    label="Loading basket capacity (ton)"
                />
                <NumberField
                    control={control}
                    name="constraints.target_yield"
                    label="Target metallic yield (%)"
                />
            </div>

            <p className="mb-3 mt-4 text-sm font-medium text-muted-foreground">
                Minimum composition
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                <NumberField control={control} name="constraints.c_min" label="Min C (%)" />
                <NumberField control={control} name="constraints.si_min" label="Min Si (%)" />
                <NumberField control={control} name="constraints.mn_min" label="Min Mn (%)" />
            </div>

            <p className="mb-3 mt-4 text-sm font-medium text-muted-foreground">
                Maximum composition
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <NumberField control={control} name="constraints.p_max" label="Max P (%)" />
                <NumberField control={control} name="constraints.s_max" label="Max S (%)" />
                <NumberField control={control} name="constraints.cu_max" label="Max Cu (%)" />
                <NumberField control={control} name="constraints.ni_max" label="Max Ni (%)" />
            </div>
        </div>
    )
}