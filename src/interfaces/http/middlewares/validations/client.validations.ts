import { body } from "express-validator";
import User from "../models/User.model";

export const createClientValidationRules = [
/*   body("nickname")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .isLength({ max: 30 })
    .withMessage("El nombre debe tener al menos 30 caracteres"),
 */
  body("name")
    
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 6 })
    .withMessage("El nombre debe tener al menos 6 caracteres")
    .isLength({ max: 50 })
    .withMessage("El nombre debe tener al menos 50 caracteres"),

  body("lastname")
  .optional()
  .isLength({ min: 6 })
    .withMessage("La apellido debe tener al menos 6 caracteres")
    .isLength({ max: 50 })
    .withMessage("El apellido debe tener al menos 50 caracteres")
  ,
  
  
  body("address")
    .optional()
    
    .isLength({ max: 50 })
    .withMessage("La direccion debe tener al menos 50 caracteres"),

  body("email")
    .optional({ checkFalsy: true })
  .isEmail()
  .withMessage("Email inválido")
  .isLength({ max: 50 })
    .withMessage("El apellido debe tener al menos 50 caracteres")
   
  ,

  body("phone")
    .optional({ checkFalsy: true })
  .matches(/^(\d{1,4})-(\d{6,8})$/)
  .withMessage("El teléfono debe tener 1-4 dígitos de característica y 6-8 dígitos de número principal")

  ,

  body("cbu")
  .optional()
  .isLength({ min: 22, max: 22 })
  .withMessage("El CBU debe tener exactamente 22 dígitos")
  .isNumeric()
  .withMessage("El CBU solo puede contener números")
  ,

  body("alias")
  .optional()
  .isLength({ min: 3, max: 20 })
  .withMessage("El alias debe tener entre 3 y 20 caracteres")
  .matches(/^[a-zA-Z0-9_]+$/)
  .withMessage("El alias solo puede contener letras, números y guiones bajos")
  ,

/*   body("birthdate")
  .optional() */
 

 
];

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
