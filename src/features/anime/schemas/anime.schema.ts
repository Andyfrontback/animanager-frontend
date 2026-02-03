import { z } from "zod";

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
  end_date: z
    .string()
    .regex(dateRegex, "Formato de fecha inválido (debe ser YYYY-MM-DD)")
    .optional(),

  // 3. Enum para order_by
  order_by: z
    .enum(["title", "score", "start_date", "end_date"])
    .default("score"),

  // 4. Enum para sort
  sort: z.enum(["asc", "desc"]).default("desc"),
});

export type queryParamsInput = z.infer<typeof queryParamsSchema>;
