import { MailServer } from "./MailService";
import { WelcomeTemplate } from "./templates/WelcomeUser.template";
/* import brypt from "bcrypt";
import { TokenService } from "../token.service"; */
import { forgotTemplate } from "./templates/forgot.template";

export class AuthMailer extends MailServer {
   generateVerificationCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async sendVerificationEmail(to: string,verificationCode:number, username: string) {

    const html = WelcomeTemplate(
      username,
      Number(verificationCode),
      "verificationLink"
    );
   
  }

  async sendWelcomeEmail(to: string,verificationCode:number, username: string) {
    // generate code
   
    //onst verificationLink = `${process.env.SERVER_DOMIN}/verify/${tokenLink}`;

    const html = WelcomeTemplate(
      username,
      Number(verificationCode),
     " verificationLink"
    );
    //await this.sendMail(to, "Bienvenido a ArenaGame 🎮", html);

    
  }

  async sendForgotEmail(token:string,to: string, username: string) {
    // generate code
    const verificationCode = this.generateVerificationCode();

   // const verificationLink = `${process.env.SERVER_DOMIN}/forgot/${tokenLink}`;

    const html = forgotTemplate(
      username,
      Number(verificationCode),
      "verificationLink"
    );
    //await this.sendMail(to, "Bienvenido a ArenaGame 🎮", html);

    return
  }

  async sendPasswordResetEmail(to: string, resetLink: string) {
    const html = `<p>Haz clic <a href="${resetLink}">aquí</a> para restablecer tu contraseña.</p>`;
    await this.sendMail(to, "Restablecer contraseña ArenaGame", html);
  }
}
