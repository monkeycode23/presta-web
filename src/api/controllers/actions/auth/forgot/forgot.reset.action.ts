import { Request, Response } from "express";
/* mport { User } from "../../../../models/User.model";
import { AuthError, JwtTokenError } from "../../../../errors/error.handler"; */
import { ApiResponse } from "../../../../utils/api.response";
import { HashService } from "../../../../services/password.service";
/* import { AuthService } from "../../../../services/auth.service";
import { AuthMailer } from "../../../../services/mail/auth.mail";
import { TokenService } from "../../../../services/token.service";
import { TempToken } from "../../../../models/token.model";
 */

import ForgotAction from "./forgotAction";


const TOKEN_SECRET = process.env.TOKEN_SECRET || "TOKEN-secret";


class ForgotResetAction extends ForgotAction {
 


  constructor() {
    super()
  }
 
  async request(req: Request, res: Response, next: any) {
    try {
      const { password ,token } = req.body;
     
      await super.validateTempToken(token);


    
    const hash = await HashService.hashPassword(password);
    console.log(hash,"hash")
    this.user.passwordHash = hash;

    
    this.user.save();

    ApiResponse.success(res, {}, this.SUCCESS_CHANGE_PASSWORD_MESSAGE, 200);
     
      
      res.json({})
      return;
    } catch (error) {
      next(error);
    }
  }




}

export default ForgotResetAction;
