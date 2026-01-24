
import { TokenService } from "../../../../../../api/services/token.service";
import { AuthError } from "../../../../../../errors/error.handler";
import { TokenModel } from "../../../../../../api/models/token.model";
import  User  from "../../../../../../api/models/User.model";



class ForgotAction {
  protected user: any;
  protected tempToken: string;
  protected forgotToken: string;

  protected SUCCESS_CHANGE_PASSWORD_MESSAGE = "you have reset your password successfully";
  protected SUCCESS_EMAIL_MESSAGE = "reset password email sended successfully";
  protected SUCCESS_VALID_CODE_MESSAGE = "reset password code validated successfully";
  protected TEMP_TOKEN_SECRET = process.env.TEMP_TOKEN_SECRET || "TEMP-TOKEN-secret";

  constructor() {
    this.user = null;
    this.tempToken = "";
    this.forgotToken = "";
  }

  protected async validateTempToken(token: string) {

    const tempToken = await TokenModel.findOne({ token }).select("_id userId");
    
    if (!tempToken) throw new AuthError("Token Not found");


    console.log(this.TEMP_TOKEN_SECRET,"TEMP_TOKEN_SECRET")
    const {decoded,valid,expired} = (await TokenService.verifyToken(token,true,this.TEMP_TOKEN_SECRET)) as any;
   
    if (!valid) {

      await TokenModel.findByIdAndDelete(tempToken._id);
      throw new AuthError("Token revoked");
    }

     if (expired){

      await TokenModel.findByIdAndDelete(tempToken._id);
      throw new AuthError("Token expired");
    }
    

    const userId = tempToken.userId
    this.user = await User.findById(userId).select("_id username email resetPasswordToken");
    if (!this.user) throw new AuthError("Invalid user");
  
  }


  protected async generateTempToken(info:string,type:string){


    console.log(this.TEMP_TOKEN_SECRET,"TEMP_TOKEN_SECRET")

    //generar token temporal para enviar al usuario
    this.tempToken = await TokenService.generateToken(
      { info },
      this.TEMP_TOKEN_SECRET,
      "10m"
    );


    console.log(this.tempToken);
    const tempToken = new TokenModel({
      userId: this.user._id,
      type,
      token: this.tempToken,
    });

    await tempToken.save()
  }
}

export default ForgotAction;