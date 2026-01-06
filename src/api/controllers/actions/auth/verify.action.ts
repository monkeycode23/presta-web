import { Request, Response } from "express";
import  User  from "../../../models/User.model";
import { HashService } from "../../../services/password.service";
import { AuthService } from "../../../services/auth.service";
import { AuthMailer } from "../../..//services/mail/auth.mail";
import { TokenService } from "../../../services/token.service";
import { ApiResponse } from "../../../utils/api.response";
import { AppError, AuthError } from "../../../errors/error.handler";



class VerifyAction {
  private user: any;
  private SUCCESS_MESSAGE = "user logout successfully";

  constructor() {
    this.user = null;
  }

  async request(req: Request, res: Response, next: any) {
    try {
       
    //obtenemos el codigo si es pr post
      const { code: verificationCode } = req.body;
      const {token} = req.params;

      
      await this.codeVerification(verificationCode,req,res)

      

 

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


  async codeVerification(verificationCode:number,req:Request,res:Response){
   
    if (!verificationCode) throw new Error("no verification code provided")

      const userId = (req as any).userId;

       const user = await User.findById(userId).select(
      "verificationToken"
    );

    console.log(user);

    if (!user) throw new AuthError("user not found");


    const verificationToken = user?.verificationToken;

    //console.log(verificationCode,"verification")
    //decodificamos el token de verificacion del suaurio
    const payload = await TokenService.verifyToken(String(verificationToken),true,"verify secret") 

      console.log(payload,"payload")

      const payloadCode =  payload.decoded.data.code
      
     if (  payloadCode != verificationCode){

      ApiResponse.error(res,{},"Invalid verification code",400)
     }
      


      user.emailVerified = true;
    user.verificationToken = "";
    //user.verificationTokenExpires = null;
    
    await user.save();

  }


  async tokenVerification(){
    
      //si es por get 
 

      //decodificamos el token recibido por get
    /*   const payloadToken = (await TokenService.verifyToken(token)) as {
        code: number;
      };

      
      if (!payloadToken)
        return res.status(400).json({
          errors: {
            token: "expired token",
          },
        });

      //comparamos si los codigos son iguales
        if (payloadToken.code != payload.data.code)
        return res.status(400).json({
          errors: {
            code: "Ivalid verification Code",
          },
        }); */
    
  }
}




export default VerifyAction