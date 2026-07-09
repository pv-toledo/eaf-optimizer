import { OptimizationFormInput } from "@/schemas/optimization-form"
import { Material } from "@/types/domain"
import { Control, FieldArrayWithId } from "react-hook-form"
import { MaterialBoundsRow } from "./material-bounds-row"

type MaterialBoundsListProps = {
    control: Control<OptimizationFormInput>
    fields: FieldArrayWithId<OptimizationFormInput, "materialBounds", "id">[]
    materials: Material[]
}

export function MaterialBoundsList({control, fields, materials}: MaterialBoundsListProps) {
    return (
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
    )
}