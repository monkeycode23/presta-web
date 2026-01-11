import { z } from "zod";

export const CreateLoanSchema = z
  .object({
    amount: z.coerce
      .number()
      .min(10000, "El monto mínimo es 10.000")
      .max(10_000_000, "El monto máximo es 10.000.000"),

    interest_rate: z.coerce
      .number()
      .min(0, "La tasa de interés no puede ser negativa"),

    payment_interval: z.enum([
      "unique",
      "daily",
      "weekly",
      "monthly",
      "fortnightly",
    ]),

    installments: z.coerce
      .number()
      .min(1, "Debe tener al menos 1 cuota")
      .max(50, "No puede tener más de 50 cuotas"),

    disbursement_date: z.coerce.string(),

    first_payment_date: z.coerce.string(),

    clientId: z
    .string({message:"El client id es obligatorio"})
    .max(30, { message: "El nombre no debe tener más de 30 caracteres." })
    ,

  })
  .refine(
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
  );




  export const EditLoanSchema = z
  .object({
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

    payment_interval: z.enum([
      "unique",
      "daily",
      "weekly",
      "monthly",
      "fortnightly",
      "custom"

    ]).optional(),

    installments: z.coerce
      .number()
      .min(1, "Debe tener al menos 1 cuota")
      .max(50, "No puede tener más de 50 cuotas")
      .optional(),

    disbursement_date: z.coerce.string().optional(),

    first_payment_date: z.coerce.string().optional(),


  })
  /* .refine(
    (data) => new Date(data.first_payment_date) >= new Date(data.disbursement_date),
    {
      message:
        "La fecha del primer pago debe ser posterior al desembolso",
      path: ["first_payment_date"],
    }
  ) */
  .refine(
    (data) =>
      data.payment_interval !== "unique" || data.installments === 1,
    {
      message: "Si el pago es único, la cantidad de cuotas debe ser 1",
      path: ["installments"],
    }
  );
