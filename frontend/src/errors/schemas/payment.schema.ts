import { z } from "zod";

export const PayPaymentSchema = z
  .object({
    amount: z.coerce
      .number()
      .min(1000, "El monto mínimo es 1000"),
      

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
