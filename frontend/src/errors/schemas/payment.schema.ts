import { z } from "zod";

export const PayPaymentSchema = z
  .object({
    amount: z.coerce
      .number()
      .min(0, "No se aceptan valores negativos"),
      

    payment_method: z.coerce
      .string("El metodo de pago es requerido")
      ,

    notes: z.coerce
      .string("")
      .max(200, "Este campo no puede superar los 200 caracteres")
      .optional()
      ,
     payment_date: z.coerce
      .string("La fecha del pago  es requerida")
      
      
      ,

    
      
  })
  /* .refine(
    (data) => new Date(data.first_payment_date) >= new Date(data.disbursement_date),
    {
      message:
        "La fecha del primer pago debe ser posterior al desembolso",
      path: ["first_payment_date"],
    }
  )
  .refine(
    (data) =>
      data.payment_interval !== "unique" || data.installments === 1,
    {
      message: "Si el pago es único, la cantidad de cuotas debe ser 1",
      path: ["installments"],
    }
  ); */



   export const EditPaymentSchema = z
  .object(
    
    {

         label: z.coerce
    
      .string() 
      .max(50, "50 caracteres maximo")
      .optional()
      ,
    amount: z.coerce
    
      .number()
      
      .min(10000, "El monto mínimo es 10.000")
      .max(10_000_000, "El monto máximo es 10.000.000")
      .optional()
      ,

    interest_rate: z.coerce
      .number()
      .min(0, "La tasa de interés no puede ser negativa")
      .optional(),

    status: z.enum([
      "pending", 
    ]).optional(),

    


  })
  /* .refine(
    (data) => new Date(data.first_payment_date) >= new Date(data.disbursement_date),
    {
      message:
        "La fecha del primer pago debe ser posterior al desembolso",
      path: ["first_payment_date"],
    }
  ) */

