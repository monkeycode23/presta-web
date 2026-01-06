import { z } from "zod";
import { COLORS } from "../../data/example";
// -------------------------
// LOGIN
// -------------------------
export const CreateEventSchema = z.object({
  title: z
    .string()
    .min(1, "El titulo es obligatorio")
    .min(3, { message: "La titulo  debe tener al menos 3 caracteres." })
    .max(30, { message: "La titulo  debe tener al menos 30 caracteres." })
    .regex(/^[a-zA-Z0-9 ]+$/, "Solo caracters alhpanumericos y espacios"),
  description: z
    .string()
    .min(1, "La descripcion es obligatoria")
    .min(3, { message: "La  descripcion  debe tener al menos 3 caracteres." })
    .max(200, { message: "La descripcion  debe tener al menos 30 caracteres." }),
  /* .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios") */
  classroom: z.string().min(1, "El aula es obligatorio"),

  type: z.string().min(1, "El tipo de evento es obligatorio"),

  timeStart: z.string().min(1, "El tiempo de inicio es obligatorio"),

  timeEnd: z.string().min(1, "El tiempo de finalizado es obligatorio"),

  color: z
    .string()
    .min(1, "El nombre es obligatorio")
    .refine((value) => COLORS.includes(value as any), {
      message: "Color inválido.",
    }),
});

// 👇 Tipo de TypeScript inferido
/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */
