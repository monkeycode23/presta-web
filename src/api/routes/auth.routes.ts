import { Router } from "express";
//import authController from "../controllers/auth/auth.contorller";
import { authRequired,noAuthRoute } from "../middlewares/auth.middleware";
import { 
    loginValidationRules,
    registerValidationRules,
    forgotEmailValidationRules,
    forgotCodeValidationRules,
    forgotPasswordValidationRules } from "../validations/auth.validator";
import { validateRequest } from "../middlewares/validator.middleware";
import authContorller from "../controllers/auth.contorller";



const router = Router();


router.post("/register", noAuthRoute,registerValidationRules,validateRequest,authContorller.registerAction());
router.post("/login",noAuthRoute,loginValidationRules,validateRequest,authContorller.loginAction());
router.post("/verify",authRequired, authContorller.verifyAction());
router.post("/logout",authRequired, authRequired, authContorller.logoutAction()); 
router.post("/resend-code",authRequired, authContorller.resendAction());
router.post("/refresh", authContorller.refreshAction());
router.post("/forgot-password",noAuthRoute, forgotEmailValidationRules,validateRequest, authContorller.forgotAction());
router.post("/forgot-password/code",noAuthRoute,forgotCodeValidationRules,validateRequest, authContorller.forgotCodeAction());
router.post("/forgot-password/reset",noAuthRoute,forgotPasswordValidationRules,validateRequest,  authContorller.forgotResetAction() );



/* 





//router.get("/verify/:token",authRequired, verify);
*/
export default router;