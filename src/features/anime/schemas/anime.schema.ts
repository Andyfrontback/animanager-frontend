import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const searchPanelSchema = z
  .object({
    page: z.string().default("1"),
    limit: z.string().default("12"),

    // Validamos formato, pero la lógica de fechas va al final
    start_date: z.string().regex(dateRegex, "Use format YYYY-MM-DD").optional(),

    end_date: z
      .string()
      .regex(dateRegex, "Use format YYYY-MM-DD")
      .optional()
      .or(z.literal("")),

    order_by: z.enum(["title", "score", "start_date", "end_date"]).optional(),
    sort: z.enum(["asc", "desc"]).optional(),
    q: z.string().optional(),
  })
  // SuperRefine: Validación cruzada entre campos
  .refine(
    (data) => {
      if (data.start_date && data.end_date) {
        return new Date(data.end_date) >= new Date(data.start_date);
      }
      return true;
    },
    {
      message: "End date cannot be before start date",
      path: ["end_date"], // El error aparecerá en el campo end_date
    },
  );

export type SearchPanelInput = z.infer<typeof searchPanelSchema>;
export type SearchPanelSchema = typeof searchPanelSchema;
