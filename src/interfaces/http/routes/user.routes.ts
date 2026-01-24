import { Router } from "express";

import { authRequired } from "../middlewares/auth.middleware";
//import projectController from "../controllers/project.controller";
import { validateRequest } from "../middlewares/validator.middleware";
import { requirePermissionRole } from "../middlewares/role.middleware";

import userController from "../controllers/user.controller";

const router = Router();




router.get(
    "/",
    authRequired,
    //requireRole("admin"),
    userController.getAction());




router.get(
    "/:userId",
    authRequired,
    //requireRole("admin"),
    userController.getAction());




router.post(
    "/",
    authRequired,
    //requireRole("admin"),
   
    validateRequest,
   

);


    
router.put(
    "/",
    authRequired,
    //requireRole("admin"),
  
    validateRequest,
);



    
router.delete(
    "/",
    //authRequired,
    //requireRole("admin"),
   
    validateRequest,
    );



export default router;