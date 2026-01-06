import { body } from "express-validator";
import { User } from "../models/User.model";


export const    createProjectValidationRules = [
   
    body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 30 })
    .withMessage("El nombre debe tener al menos 30 caracteres"),
     
    body("description")
      .notEmpty()
      .withMessage("La descripcion es obligatoria")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres")
      .isLength({ max: 200 })
    .withMessage("El nombre debe tener al menos 200 caracteres"),
    
      body("projectManager")
        .notEmpty()
        .withMessage("El project manager es obligatorio")
        .isMongoId()
        .withMessage("El project manager debe ser un ID de Mongo válido")
        .custom(async (value: string) => {
          const user = await User.findOne({ _id: value }).select("_id role");
          if (!user) {
            throw new Error("No existe ningún usuario con este ID");
          }
          return true;
        })
      ,

     /* body("githubUrl")
      .optional()
      .isURL()
      .withMessage("Debe ser una URL válida")
      .isLength({ max: 100 })
    .withMessage("El nombre debe tener al menos 100 caracteres"), */
  ]

/* 


export const registerValidationRules = [
    body("username").notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().withMessage("Email inválido"),
    body("terms")
      .notEmpty()
      .withMessage("Terminos y condiciones  requerido")
      .custom((value)=>{
        if (!value ) {
        throw new Error("Debes aceptar los terminos y condiciones");
      }
      return true;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
      

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
  ]




  export const forgotEmailValidationRules = [
   
    body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail().withMessage("Email inválido")
    .custom(async (value:string) => {
      const user = await User.findOne({ email: value }).select("_id email");
      if (!user) {
        throw new Error("No existe ningún usuario con este email");
      }
      return true;
    })
  ]


  
  export const forgotCodeValidationRules = [
   
    body("code")
    .notEmpty()
    .withMessage("El codigo es obligatorio")
    .isNumeric().withMessage("El código debe contener solo números")
  .isLength({ min: 4, max: 4 }).withMessage("El código debe tener 4 dígitos"),
    
    body("token")
     .notEmpty().withMessage("token no proveido")
    
  ]


  
  export const forgotPasswordValidationRules = [
   
   
     body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/)
      .withMessage(
      "La contraseña debe incluir al menos una mayúscula, una minúscula y un carácter especial"
    ),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
    
  ] */