import { Request, Response } from "express";
import  User  from "../../../models/User.model";
import { AuthError,JwtTokenError } from "../../../errors/error.handler";
import { ApiResponse } from "../../../utils/api.response";


class LogoutAction {
  private user: any;
  private SUCCESS_MESSAGE = "user logout successfully";

  constructor() {
    this.user = null;
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const user = await User.findById((req as any).userId);
      
      if (!user) throw new AuthError("Invalid user");

      res.clearCookie("refreshToken");

      user.refreshTokens.shift();
      //user.refreshTokens = user.refreshTokens.filter(t => t.token !== token);
      await user.save();
      
      ApiResponse.success(
        res,
        {
          user,
        },
        this.SUCCESS_MESSAGE,
        200
      );

      return;
    } catch (error) {
      next(error);
    }
  }
}


export default LogoutAction;