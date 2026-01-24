import { z } from "zod";

// -------------------------
// LOGIN
// -------------------------
export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// -------------------------
// REGISTER
// -------------------------
export const RegisterSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
  password: z.string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
  .regex(/[a-z]/, { message: "Debe incluir al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Debe incluir al menos una letra mayúscula." })
  .regex(/\d/, { message: "Debe incluir al menos un número." })
  .regex(/[@$!%*?&#.\-_]/, { message: "Debe incluir al menos un carácter especial." })
  ,
  terms: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar los términos y condiciones",
  })
  
});


export const resetPasswordSchema = z.object({
  
   password: z.string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
  .regex(/[a-z]/, { message: "Debe incluir al menos una letra minúscula." })
  .regex(/[A-Z]/, { message: "Debe incluir al menos una letra mayúscula." })
  .regex(/\d/, { message: "Debe incluir al menos un número." })
  .regex(/[@$!%*?&#.\-_]/, { message: "Debe incluir al menos un carácter especial." })
  ,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});


export const forgotEmailSchema = z.object({
  email: z.string().email("Email inválido"),
  
});


/*   confirmPassword: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // campo donde va el error
  }); */


  // 👇 Tipo de TypeScript inferido
/* export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>; */