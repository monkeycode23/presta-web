import { z } from "zod";
import { COLORS } from "../../data/example";
// -------------------------
// LOGIN
// -------------------------
export const CreateStudentSchema = z.object({
  names: z
    .string()
    .min(1, "El nombre es obligatorio")
    .min(3, { message: "El nombre  debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre  debe tener al menos 50 caracteres." })
    .regex(/^[a-zA-Z ]+$/, "Solo caracters alfabeticos y espacios"),
  lastname: z
    .string()
    .min(1, "El apellido es obligatorio")
    .min(3, { message: "El apellido  debe tener al menos 3 caracteres." })
    .max(50, { message: "El apellido  debe tener al menos 50 caracteres." })
     .regex(/^[a-zA-Z ]+$/, "Solo caracters alfabeticos y espacios")
    ,
  /* .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios") */
  
});

// 👇 Tipo de TypeScript inferido
/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */
