import { Request, Response } from "express";
import  User  from "../../../../../api/models/User.model";
import { HashService } from "../../../../../api/services/password.service";
import { AuthService } from "../../../../../api/services/auth.service";
import { ApiResponse } from "../../../../../application/utils/api.response";
import { AuthError } from "../../../../../errors/error.handler";



class LoginAction {
  
  private user:any 
  private SUCCESS_MESSAGE = "user login successfully";
  private accessToken:string
  private refreshToken:string


  
  constructor() {
    this.user = null
    this.accessToken = ""
    this.refreshToken= ""
  }

  async request(req:Request,res:Response,next:any){

    try {
        const { email, password } = req.body;
      
        this.user = await this.authenticate(email, password);
        
        const token = await this.generateAccessTokens(res)

        await this.user.save();
        
        ApiResponse.success(res,{
          token:this.accessToken, 
        },
        this.SUCCESS_MESSAGE,
        200
      )

      return

    } catch (error){
       next(error)
    }
  }

   async authenticate(email: string, password: string) {
    //validamos q exista el usuario
    const user = await User.findOne({ email }).select(`
          _id username email roles emailVerified passwordHash
           failedLoginAttempts lockUntil refreshTokens`).populate({path:"refreshTokens", select:"_id token"});

    if (!user) throw new AuthError("Invalid Credentials",{email:"ivalid credentials",password:"ivalid credentials"});

    //verificamos la password
    const isValid = await HashService.verifyPassword(
      password,
      user.passwordHash
    );

    if (!isValid) {
      user.failedLoginAttempts++;
      await user.save();
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 60 * 60 * 1000);
        await user.save();
      }
      throw new AuthError("Invalid Credentials",{email:"ivalid credentials",password:"ivalid credentials"});
    }
    
    return user
  }



  async generateAccessTokens(res:Response):Promise<string | void> {

    if(!this.user) return
    
    const refreshToken = this.user.refreshTokens;
    let token;

    //generamos un token de acceso temoporal
    this.accessToken = await AuthService.generateAccessToken(
      this.user._id.toString()
    );
    
    
    if (refreshToken.length == 0) {

      //si no hay refresh token generar uno nuevo
      const _token = await AuthService.generateRefreshToken(this.user._id.toString(),res);
      this.refreshToken = _token.token
      //pusheamos porq no hay ningun token
      this.user.refreshTokens.push(_token._id);
    
    } else {

      this.refreshToken = refreshToken[0].token
      console.log(refreshToken)
      //si hay refresh otkens  lo verificamos que sea valido
      const decoded = await AuthService.verifyRefreshToken(this.refreshToken)
      //si no es valido hay q regenerar otro refresh token
      console.log(decoded,"decoded")

      if(!decoded) {
        
        const _token = await AuthService.generateRefreshToken(this.user._id.toString(),res);
        this.refreshToken = _token.token;
        this.user.refreshTokens.shift()
        this.user.refreshTokens.push(_token._id); 
      }

      this.refreshToken = refreshToken[0].token
      
      AuthService.setRefreshTokenCookie(this.refreshToken,res)

    }

  }

}



export default LoginAction