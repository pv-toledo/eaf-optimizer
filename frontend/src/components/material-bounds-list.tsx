import { OptimizationFormInput } from "@/schemas/optimization-form"
import { Material } from "@/types/domain"
import { Control, FieldArrayWithId } from "react-hook-form"
import { MaterialBoundsRow } from "./material-bounds-row"
import { InfoPopover } from "./info-popover"

type MaterialBoundsListProps = {
    control: Control<OptimizationFormInput>
    fields: FieldArrayWithId<OptimizationFormInput, "materialBounds", "id">[]
    materials: Material[]
}

export function MaterialBoundsList({ control, fields, materials }: MaterialBoundsListProps) {
    return (
        <div className="rounded-xl border bg-card p-4">
            <div className="mb-3 flex items-center gap-1.5">
                <p className="text-sm font-medium text-muted-foreground">Available materials (demo)</p>
                <InfoPopover>
                    These are example materials with typical prices and composition. You can set a
                    minimum or maximum amount for any of them, and click on a material to see its
                    full composition.
                </InfoPopover>
            </div>
            <div className="flex flex-col gap-2">

                {fields.map((fieldItem, index) => (
                    <MaterialBoundsRow
                        key={fieldItem.id}
                        control={control}
                        index={index}
                        material={materials[index]}
                    />
                ))}
            </div>
        </div>

    )
}