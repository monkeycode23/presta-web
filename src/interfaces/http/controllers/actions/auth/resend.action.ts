import { Request, Response } from "express";
import  User  from "../../../../../api/models/User.model";
import { HashService } from "../../../../../api/services/password.service";
import { AuthService } from "../../../../../api/services/auth.service";
import { AuthMailer } from "../../../../../api/services/mail/auth.mail";
import { TokenService } from "../../../../../api/services/token.service";
import { AuthError, JwtTokenError } from "../../../../../errors/error.handler";
import { ApiResponse } from "../../../../../application/utils/api.response";

class ResendAction {
  private user: any;
  private SUCCESS_MESSAGE = "email sended  successfully";

  constructor() {
    this.user = null;
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const user = await User.findById((req as any).userId);

      if (!user) throw new AuthError("Invalid user");

      //send verify email
      const mailer = new AuthMailer();


        const verificationCode = AuthService.generateVerificationCode();
          
              //generarte hash for link
              const verificationToken = await TokenService.generateToken(
                { code: verificationCode },
                "verify secret",
                "5m"
              );

     await mailer.sendVerificationEmail(
        user.email,
        verificationCode,
        user.username
      );

      //generate and save tokens
      user.verificationToken = verificationToken;
      
      await user.save();

      ApiResponse.success(
        res,
        {},
        this.SUCCESS_MESSAGE,
        200
      );

      return;
    } catch (error) {
      next(error);
    }
  }
}

export default ResendAction;
