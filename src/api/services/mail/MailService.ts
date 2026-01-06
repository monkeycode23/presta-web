import nodemailer from "nodemailer";

export class MailServer {
  protected transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  protected async sendMail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: `"ArenaGame" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  }
}
