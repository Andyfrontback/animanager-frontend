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

// Helper para obtener el primer día del año actual (YYYY-01-01)
const year = new Date().getFullYear();

// Regex sencilla para formato YYYY-MM-DD
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const queryParamsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(12),

  // 2. Fechas con validación y transform
  start_date: z
    .string()
    .regex(dateRegex, "Formato de fecha inválido (debe ser YYYY-MM-DD)")
    .default(`${year}-01-01`),

  // 3. Enum para order_by
  order_by: z
    .enum(["title", "score", "start_date", "end_date"])
    .default("score"),

  // 4. Enum para sort
  sort: z.enum(["asc", "desc"]).default("desc"),
});

export type queryParamsInput = z.infer<typeof queryParamsSchema>;
