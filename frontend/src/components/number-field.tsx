"use client";

import { Controller, Control, FieldPath, FieldPathValue } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { OptimizationFormInput } from "@/schemas/optimization-form";

type NumericFieldPath = {
    [K in FieldPath<OptimizationFormInput>]: FieldPathValue<OptimizationFormInput, K> extends string | number
    ? K
    : never;
}[FieldPath<OptimizationFormInput>];

type NumberFieldProps = {
    control: Control<OptimizationFormInput>;
    name: NumericFieldPath;
    label: string;
};

export function NumberField({ control, name, label }: NumberFieldProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-sm">{label}</FieldLabel>
                    <Input
                        id={field.name}
                        type="text"
                        inputMode="decimal"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value)}
                        aria-invalid={fieldState.invalid}
                        className="text-xs md:text-sm"
                    />
                    <div className="min-h-8">
                        {fieldState.error && (
                            <FieldError errors={[fieldState.error]} className="text-xs" />
                        )}
                    </div>
                </Field>
            )}
        />
    );
}