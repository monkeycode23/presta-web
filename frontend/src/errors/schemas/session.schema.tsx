import { z } from "zod";
import { COLORS } from "../../data/example";
// -------------------------
// LOGIN
// -------------------------
export const CreateSessionSchema = z.object({
  
  description: z
  
    .string()
    
    .max(200, { message: "La descripcion  debe tener al menos 30 caracteres." }).optional(),
 
  date: z.string().min(1, "El tipo de evento es obligatorio")
   .refine(
        (value) => !isNaN(Date.parse(value)),
        "La fecha no es válida"
      ),

  timeStart: z.string().min(1, "El tiempo de inicio es obligatorio"),

  timeEnd: z.string().min(1, "El tiempo de finalizado es obligatorio"),

 
}).refine(
    (data) => {
      const start = new Date(`1970-01-01T${data.timeStart}`);
      const end = new Date(`1970-01-01T${data.timeEnd}`);

      return end > start;
    },
    {
      message: "La hora de finalización debe ser mayor a la de inicio",
      path: ["timeEnd"], // 👈 error aparece en timeEnd
    }
     )


/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */
