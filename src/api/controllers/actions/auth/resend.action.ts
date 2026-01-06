import { Request, Response } from "express";
import  User  from "../../../models/User.model";
import { HashService } from "../../../services/password.service";
import { AuthService } from "../../../services/auth.service";
import { AuthMailer } from "../../../services/mail/auth.mail";
import { TokenService } from "../../../services/token.service";
import { AuthError, JwtTokenError } from "../../../errors/error.handler";
import { ApiResponse } from "../../../utils/api.response";

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
