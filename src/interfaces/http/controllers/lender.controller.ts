

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

import  Lender  from "../../../api/models/lender.model";


import { Request, Response } from "express";
import User from "../../../api/models/User.model";
import { ValidationError } from "../../../errors/error.handler";

class LenderController {
  private actionHandler: any;

  constructor() {}



  createAction() {
    return async(req: Request, res: Response, next: any) => {
      try {

        
        const{ userId,name,address,phone } = req.body;


        const user = await User.findById(userId);

        if(!user) throw new ValidationError("User not found");
        

        const lender = new Lender({
            user:user._id,
            name,
            address,
            phone
        })


        await lender.save()
        ApiResponse.success(res, lender, "Project created successfully");

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

export default LenderController;
