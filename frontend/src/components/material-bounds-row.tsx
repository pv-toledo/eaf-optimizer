import { OptimizationFormInput } from "@/schemas/optimization-form"
import { Material } from "@/types/domain"
import { Control } from "react-hook-form"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { ChevronDown } from "lucide-react"
import { NumberField } from "./number-field"
import { CompositionValue } from "./composition-value"

type MaterialBoundsRowProps = {
    control: Control<OptimizationFormInput>
    index: number
    material: Material
}

export function MaterialBoundsRow({ control, index, material }: MaterialBoundsRowProps) {
    return (
        <Collapsible className="rounded-md border">
            <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
                <CollapsibleTrigger className="group flex flex-1 items-center justify-between text-left hover:pointer">
                    <div>
                        <p className="text-sm font-medium md:text-base">{material.name}</p>
                        <p className="text-xs text-muted-foreground">
                            R$ {material.price}/ton · Yield: {material.metallic_yield}%
                        </p>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <div className="flex shrink-0 gap-2">
                    <div className="w-40">
                        <NumberField
                            control={control}
                            name={`materialBounds.${index}.min_pct`}
                            label="Min (%)"
                        />
                    </div>
                    <div className="w-40">
                        <NumberField
                            control={control}
                            name={`materialBounds.${index}.max_pct`}
                            label="Max (%)"
                        />
                    </div>
                </div>
            </div>

            <CollapsibleContent className="border-t p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Chemical composition (%)
                </p>
                <div className="mb-4 grid grid-cols-4 gap-2 text-xs">
                    <CompositionValue label="Fe" value={material.fe} />
                    <CompositionValue label="C" value={material.c} />
                    <CompositionValue label="Si" value={material.si} />
                    <CompositionValue label="Mn" value={material.mn} />
                    <CompositionValue label="P" value={material.p} />
                    <CompositionValue label="S" value={material.s} />
                    <CompositionValue label="Cu" value={material.cu} />
                    <CompositionValue label="Ni" value={material.ni} />
                </div>

                <p className="mb-2 text-xs font-medium text-muted-foreground">
                    Oxides (%)
                </p>
                <div className="grid grid-cols-4 gap-2 text-xs">
                    <CompositionValue label="SiO₂" value={material.sio2} />
                    <CompositionValue label="Al₂O₃" value={material.al2o3} />
                    <CompositionValue label="CaO" value={material.cao} />
                    <CompositionValue label="MgO" value={material.mgo} />
                    <CompositionValue label="FeO" value={material.feo} />
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}