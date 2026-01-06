import { z } from "zod";

const phoneRegex = /^[0-9]{2,4}-[0-9]{6,8}$/;
const prefixRegex = /^[0-9a-zA-Z]{2,4}$/; // opcional prefijo

export const CreateClientSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(30, { message: "El nombre no debe tener más de 30 caracteres." })
    .regex(/^[a-zA-Z0-9 ]+$/, "Solo caracteres alfanuméricos y espacios"),

  email: z
    .string()
    
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Debe ser un email válido",
  })
    ,

  phone: z
    .string()
    .optional()
     .refine((val) => !val || phoneRegex.test(val), {
      message: "El teléfono debe tener prefijo 2-4 números, un guion, y 6-8 números principales. Ej: 123-1234567",
    }),

  address: z
    .string()
    .max(100, { message: "La dirección no debe tener más de 100 caracteres." })
    .optional(),
});




  // 👇 Tipo de TypeScript inferido
/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */