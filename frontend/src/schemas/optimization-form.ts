import z from "zod";

function decimalNumber(schema: z.ZodNumber) {
  return z.union([z.string(), z.number()]).transform((val, ctx) => {
    if (typeof val === "number") return val

    const trimmed = val.trim()
    if (trimmed === "") {
      ctx.addIssue({code: "custom", message: "Required field"})
      return z.NEVER
    }

    const parsed = Number(trimmed.replace(",", "."))
    if (Number.isNaN(parsed)) {
      ctx.addIssue({code: "custom", message: "Insert a valid number"})
      return z.NEVER
    }

    return parsed
  }).pipe(schema)
}
// function decimalNumber<T extends z.ZodTypeAny>(schema: T) {
//   return z.preprocess((val) => {
//     if (typeof val !== "string") return val

//     const trimmed = val.trim()
//     if (trimmed === "") return undefined

//     const normalized = trimmed.replace(",", ".")
//     const parsed = Number(normalized)

//     return Number.isNaN(parsed) ? trimmed : parsed
//   }, schema)
// }

export const constraintsSchema = z.object({
  loading_basket_capacity: decimalNumber(z
    .number({ error: "Loading basket capacity must be a number" })
    .gt(0, "Loading basket capacity must be greater than 0")),
  target_yield: decimalNumber(z
    .number({ error: "Target Yield must be a number" })
    .min(0, "Target yield must be greater than or equal to 0")
    .max(100, "Target yield must be less than or equal to 100")),

  c_min: decimalNumber(z.number({ error: "Field required" }).min(0).max(100)),
  si_min: decimalNumber(z.number({ error: "Field required" }).min(0).max(100)),
  mn_min: decimalNumber(z.number({ error: "Field required" }).min(0).max(100)),

  p_max: decimalNumber(z.number({ error: "Field required" }).min(0).max(100)),
  s_max: decimalNumber(z.number({ error: "Field required" }).min(0).max(100)),
  cu_max: decimalNumber(z.number({ error: "Field required" }).min(0).max(100)),
  ni_max: decimalNumber(z.number({ error: "Field required" }).min(0).max(100)),
});

export type ConstraintsFormData = z.infer<typeof constraintsSchema>;

export const materialBoundsSchema = z
  .object({
    name: z.string(),
    min_pct: decimalNumber(z
      .number()
      .min(0, "Minimum percentage must be greater than or equal to 0")
      .max(100, "Minimum percentage must be less than or equal to 100")),
    max_pct: decimalNumber(z
      .number()
      .min(0, "Maximum percentage must be greater than or equal to 0")
      .max(100, "Maximum percentage must be less than or equal to 100")),
  })
  .refine((data) => data.min_pct <= data.max_pct, {
    message:
      "Minimum percentage must be less than or equal to maximum percentage",
    path: ["max_pct"],
  });

export type MaterialBoundsFormData = z.infer<typeof materialBoundsSchema>;

export const formSchema = z.object({
  constraints: constraintsSchema,
  materialBounds: z.array(materialBoundsSchema),
})

export type OptimizationFormData = z.infer<typeof formSchema>;

export type OptimizationFormInput = z.input<typeof formSchema>;