import z from "zod";

export const constraintsSchema = z.object({
  loading_basket_capacity: z
    .number({error: "Loading basket capacity must be a number"})
    .gt(0, "Loading basket capacity must be greater than 0"),
  target_yield: z
    .number()
    .min(0, "Target yield must be greater than or equal to 0")
    .max(100, "Target yield must be less than or equal to 100"),

  c_min: z.number().min(0).max(100),
  si_min: z.number().min(0).max(100),
  mn_min: z.number().min(0).max(100),

  p_max: z.number().min(0).max(100),
  s_max: z.number().min(0).max(100),
  cu_max: z.number().min(0).max(100),
  ni_max: z.number().min(0).max(100),
});

export type ConstraintsFormData = z.infer<typeof constraintsSchema>;

export const materialBoundsSchema = z
  .object({
    name: z.string(),
    min_pct: z
      .number()
      .min(0, "Minimum percentage must be greater than or equal to 0")
      .max(100, "Minimum percentage must be less than or equal to 100"),
    max_pct: z
      .number()
      .min(0, "Maximum percentage must be greater than or equal to 0")
      .max(100, "Maximum percentage must be less than or equal to 100"),
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