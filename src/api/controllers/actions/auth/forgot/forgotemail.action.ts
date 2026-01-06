import { Request, Response } from "express";
import  User  from "../../../../models/User.model";
import { AuthError, JwtTokenError } from "../../../../errors/error.handler";
import { ApiResponse } from "../../../../utils/api.response";
import { AuthService } from "../../../../services/auth.service";
import { AuthMailer } from "../../../../services/mail/auth.mail";
/* import { TokenService } from "../../../../services/token.service";
import { HashService } from "../../../../services/password.service";
import { TempToken } from "../../../../models/token.model"; */

import ForgotAction from "./forgotAction";

class ForgotEmailAction extends ForgotAction {
  constructor() {
    super();
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const { email } = req.body;

      this.user = await User.findOne({ email }).select("_id username email");

      if (!this.user) throw new AuthError("Invalid email");
      // await this.sendEmail(email,res)

      await this.generateTokenSendToken();

      const authMailer = new AuthMailer();

      await authMailer.sendForgotEmail(
        this.forgotToken,
        email,
        this.user.username
      );

      this.user.resetPasswordToken = this.forgotToken;

      this.user.save();

      ApiResponse.success(
        res,
        { token: this.tempToken },
        this.SUCCESS_EMAIL_MESSAGE,
        200
      );

      return;
    } catch (error) {
      next(error);
    }
  }
  

  async generateTokenSendToken() {
    //generar token con codigo
    const code = AuthService.generateVerificationCode();

    this.forgotToken =await AuthService.generateForgotToken(code);

    super.generateTempToken("reset password token","reset-password-code" );
    
  }
}

export default ForgotEmailAction;
