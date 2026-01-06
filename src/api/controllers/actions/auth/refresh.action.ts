import { Request, Response } from "express";
import  User  from "../../../models/User.model";
import { AuthService } from "../../../services/auth.service";
/* import { AuthMailer } from "../../../services/mail/auth.mail";
import { HashService } from "../../../services/password.service";
import { TokenService } from "../../../services/token.service"; */

import { AuthError, JwtTokenError } from "../../../errors/error.handler";
import { ApiResponse } from "../../../utils/api.response";

/**refreshhh token!! */

class RefreshAction {
  private user: any;
  private SUCCESS_MESSAGE = "user logout successfully";

  constructor() {
    this.user = null;
  }

  async request(req: Request, res: Response, next: any) {
    try {
     
      const auth  =req.headers.authorization
      console.log(auth,"asdasd")
      const token = ""
      console.log(token)

      if (!token) throw new JwtTokenError("Not refresh token provided")

      const decoded: any = await AuthService.verifyRefreshToken(token);

      console.log(decoded)

      const user = await User.findById(decoded.userId).select("_id username email refreshTokens roles emailVerified terms privacy")
      .populate({path:"refreshTokens", select:"_id token"});

      if (!user) throw new AuthError("Invalid user");


      if (!user.refreshTokens.find((x:any) => x.token === token)) {
       throw new AuthError("Refresh token revoke");
      }

      const newAccess = await AuthService.generateAccessToken(user._id.toString());

      const userResponse ={
        _id:user._id,
        username:user.username,
        email:user.email,
        roles:user.roles,
        emailVerified:user.emailVerified,
        terms:user.terms,
        privacy:user.privacy
      }

      ApiResponse.success(
        res,
        {
          user:userResponse,
          token:newAccess
        },
        this.SUCCESS_MESSAGE,
        200
      );

      return 
    } catch (error) {
      next(error);
    }
  }
}

export default RefreshAction;
