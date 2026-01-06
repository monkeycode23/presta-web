import { z } from "zod";
import { COLORS } from "../../data/example";
// -------------------------
// LOGIN
// -------------------------
export const CreateAddRourseSchema = z.object({
  title: z
    .string()
    .min(1, "El titulo es obligatorio")
    .min(3, { message: "El nombre  debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre  debe tener al menos 50 caracteres." })
    .regex(/^[a-zA-Z0-9 ]+$/, "Solo caracters alfabeticos y espacios"),
  type: z
    .string()
    .min(1, "El tipo es obligatorio")
    .min(3, { message: "El apellido  debe tener al menos 3 caracteres." })
    .max(50, { message: "El apellido  debe tener al menos 50 caracteres." })
     .regex(/^[a-zA-Z ]+$/, "Solo caracters alfabeticos y espacios")
    ,
    url: z
    .string()
    .min(1, "El apellido es obligatorio")
    .max(200, { message: "El apellido  debe tener al menos 200 caracteres." })
    .url({ message: "Debe ser una url valida." })
    ,
    topic: z
    .string()
    .min(1, "El topic es obligatorio")
    .max(50, { message: "El apellido  debe tener al menos 50 caracteres." })
    

  /* .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios") */
  
});

// 👇 Tipo de TypeScript inferido
/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */
