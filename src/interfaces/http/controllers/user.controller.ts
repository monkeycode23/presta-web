

/* import LoginAction from "./actions/auth/login.action";
import RegisterAction from "./actions/auth/register.action";
import VerifyAction from "./actions/auth/verify.action";
import LogoutAction from "./actions/auth/logout.action";
import ResendAction from "./actions/auth/resend.action";
import RefreshAction from "./actions/auth/refresh.action";
import ForgotEmailAction from "./actions/auth/forgot/forgotemail.action";
import ForgotCodeAction from "./actions/auth/forgot/forgotcode.action";
import ForgotResetAction from "./actions/auth/forgot/forgot.reset.action";
 */
import { ApiResponse } from "../../../application/utils/api.response";

//import ProjectModel from "../models/project.model";

import  User  from "../../../api/models/User.model";


import { Request, Response } from "express";

class UserController {
  private actionHandler: any;

  constructor() {}

 getAction() {
    return async(req: Request, res: Response, next: any) => {
      try {

        const { userId} = req.params;
       
        if(userId) {
            
            const user = await User.findById(userId);

            if(!user) throw new Error("no user found");

             ApiResponse.success(res, user, "Project created successfully");
             return 
        }

        ApiResponse.success(res, {}, "Project created successfully");

        return;
        
      } catch (error) {

        next(error);
      }
     
    };
  }


  createAction() {
    return async(req: Request, res: Response, next: any) => {
      try {

        
        const{ name,color } = req.body;


        ApiResponse.success(res, {}, "Project created successfully");

        return;
        
      } catch (error) {

        next(error);
      }
      res.send("Project Created");
    };
  }

  updateAction() {
    /*  const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler */

    return (req: Request, res: Response, next: any) => {
      res.send("Project Created");
    };
  }
  deleteAction() {
    /*  const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler */

    return (req: Request, res: Response, next: any) => {
      res.send("Project Created");
    };
  }
}

export default new UserController();
