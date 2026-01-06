import { z } from "zod";
import { COLORS } from "../../data/example";
// -------------------------
// LOGIN
// -------------------------
export const CreateTopicSchema = z.object({
  title: z.string().min(1, "El nombre es obligatorio")
  .min(3, { message: "La description debe tener al menos 3 caracteres." })
  .max(50, { message: "La description debe tener al menos 30 caracteres." })
  .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios")
  ,
  description: z.string().min(1, "El nombre es obligatorio")
  .min(3, { message: "La description tener al menos 3 caracteres." })
  .max(200, { message: "La description debe tener al menos 30 caracteres." })
   .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios")
  
});



export const UploadTopicSchema = z.object({
  title: z.string()
  .max(50, { message: "La description debe tener al menos 40 caracteres." })
  .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios")
   .optional()
  ,
  description: z.string()
 
  .max(200, { message: "La description debe tener al menos 200 caracteres." })
   .regex(/^[a-zA-Z0-9 ]+$/,"Solo caracters alhpanumericos y espacios")
    .optional()
  
});



  // 👇 Tipo de TypeScript inferido
/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */