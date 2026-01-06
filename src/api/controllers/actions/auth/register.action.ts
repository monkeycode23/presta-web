import { Request, Response } from "express";
import  User  from "../../../models/User.model";
import Role from "../../../models/role.model";
import { HashService } from "../../../services/password.service";
import { AuthService } from "../../../services/auth.service";
import { AuthMailer } from "../../../services/mail/auth.mail";
import { TokenService } from "../../../services/token.service";
import { AuthError } from "../../../errors/error.handler";
import { ApiResponse } from "../../../utils/api.response";

class RegisterAction {
  private user: any;
  private SUCCESS_MESSAGE = "user registerd successfully";

  constructor() {
    this.user = null;
  }

  async request(req: Request, res: Response, next: any) {
    try {
      const { email, username, password, terms } = req.body;

      await this.validateUser( username,email, terms);

      await this.hashPassword(password);

      await this.createUser();

      await this.sendWelcomeEmail();

      const token = await this.generateTokens(res);

      await this.user.save();

      ApiResponse.success(
        res,
        {
          token,
          user: this.user,
        },
        this.SUCCESS_MESSAGE,
        200
      );

      return;
      
    } catch (error) {
      next(error);
    }
  }

  async generateTokens(res: Response) {
    const accessToken = await AuthService.generateAccessToken(
      this.user._id.toString()
    );

    const refreshToken = await AuthService.generateRefreshToken(
      this.user._id.toString(),
      res
    );

    //console.log(refreshToken,"refreshTokenaction")


    this.user.refreshTokens.push(refreshToken._id);

    return accessToken;
  }

  async sendWelcomeEmail() {
    //send verify email
    const mailer = new AuthMailer();

      const verificationCode = AuthService.generateVerificationCode();
    
        //generarte hash for link
        const verificationToken =await TokenService.generateToken(
          { code: verificationCode },
          "verify secret",
          "5m"
        );

     await mailer.sendWelcomeEmail(
      this.user.email,
      verificationCode,
      this.user.username
    );
    //generate and save tokens
    this.user.verificationToken = verificationToken;
  }

  async hashPassword(password: string) {
    const hash = await HashService.hashPassword(password);
    this.user.passwordHash = hash;
    return hash;
  }

  async createUser() {
    const { email, username, passwordHash, terms } = this.user;

    const role  = await Role.findOne({name:"user"})

    if(!role) throw new Error("Not User role registered")

    this.user = new User({
      email,
      username,
      passwordHash,
      emailVerified: false,
      terms,
      roles:[role._id]
    });
  }

  async validateUser(username: string, email: string, terms: boolean) {
    this.user = {}
 
    if (!terms)
      throw new AuthError("You may accept terms and conditions", {
        terms: "Debes aceptar los terminos y condiciones",
      });

    this.user.terms = terms;

    const usernameExists = await User.findOne({ username });
    if (usernameExists)
      throw new AuthError("Username already in use", {
        username: "Username already in use",
      });

    this.user.username = username;

    const exists = await User.findOne({ email });
    if (exists)
      throw new AuthError("Email already in use", {
        email: "Username already in use",
      });

    this.user.email = email;
  }
}

export default RegisterAction;
