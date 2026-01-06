import LoginAction from "./actions/auth/login.action";
import RegisterAction from "./actions/auth/register.action";
import VerifyAction from "./actions/auth/verify.action";
import LogoutAction from "./actions/auth/logout.action";
import ResendAction from "./actions/auth/resend.action";
import RefreshAction from "./actions/auth/refresh.action";
import ForgotEmailAction from "./actions/auth/forgot/forgotemail.action";
import ForgotCodeAction from "./actions/auth/forgot/forgotcode.action";
import ForgotResetAction from "./actions/auth/forgot/forgot.reset.action";

class AuthController {

    private actionHandler:any
    
    constructor(){}

    loginAction(){

        const login = new LoginAction();
        this.actionHandler = login.request.bind(login); 
        return this.actionHandler
    
    }


    forgotCodeAction(){
        const forgotCode = new ForgotCodeAction();
        this.actionHandler = forgotCode.request.bind(forgotCode);
        return this.actionHandler
    
    }

    forgotResetAction(){
        const forgotReset = new ForgotResetAction();
        this.actionHandler = forgotReset.request.bind(forgotReset);
        return this.actionHandler
    
    }


    forgotAction(){
        const forgot = new ForgotEmailAction();
        this.actionHandler = forgot.request.bind(forgot);
        return this.actionHandler
        
    }

    
    logoutAction(){
        const logout = new LogoutAction();
        this.actionHandler = logout.request.bind(logout);
        return this.actionHandler
        
    }



     registerAction(){
        const register = new RegisterAction();
        this.actionHandler = register.request.bind(register);
        return this.actionHandler
    
    } 


    refreshAction(){
        const refresh = new RefreshAction();
        this.actionHandler = refresh.request.bind(refresh);
        return this.actionHandler
    
    } 
    
    resendAction(){
        const resend = new ResendAction();
        this.actionHandler = resend.request.bind(resend);
        return this.actionHandler
    
    } 


     verifyAction(){
        const verify = new VerifyAction();
        this.actionHandler = verify.request.bind(verify);
        return this.actionHandler
    
    } 
}



export default new  AuthController()