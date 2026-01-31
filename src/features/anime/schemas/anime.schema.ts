import { z } from "zod";

export const getTopCurrentAnimesSchema = z.object({
  start_date: z
    .string({ error: "La start_date debe ser de tipo String" })
    .optional()
    .default("2026-01-01"), //'YYYY-MM-DD'
  page: z.coerce
    .number({ error: "La page debe ser un número" })
    .optional()
    .default(1),
  limit: z.coerce
    .number({ error: "El limit debe ser un número" })
    .optional()
    .default(12),
});

export type getTopCurrentAnimesInput = z.infer<
  typeof getTopCurrentAnimesSchema
>;
