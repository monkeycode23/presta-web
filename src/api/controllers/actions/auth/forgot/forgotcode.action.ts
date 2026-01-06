import { Request, Response } from "express";
import { AuthError } from "../../../../errors/error.handler";
import { ApiResponse } from "../../../../utils/api.response";
import { AuthService } from "../../../../services/auth.service";
import ForgotAction from "./forgotemail.action";


class ForgotCodeAction extends ForgotAction {
  constructor() {
    super();
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const { code, token } = req.body;

      await super.validateTempToken(token);

       this.forgotToken = this.user.resetPasswordToken;

      console.log(this.forgotToken, "forgotToken", this.user);

      if (!this.forgotToken)
        throw new AuthError("This user doesnt have a reset password token");

      const payload = (await AuthService.verifyForgotToken(
        this.forgotToken
      )) as any;

      const payloadCode = payload;

      console.log(payloadCode, "payloadCode",code)
      if (payloadCode.code != code) throw new AuthError("Invalid code");

      this.user.resetPasswordToken = null;

      this.user.save();

      await super.generateTempToken("send code token", "password-reset");

      ApiResponse.success(
        res,
        { token: this.tempToken },
        this.SUCCESS_VALID_CODE_MESSAGE,
        200
      ); 

      res.json({})

      return;
    } catch (error) {
      next(error);
    }
  }
}

export default ForgotCodeAction;
