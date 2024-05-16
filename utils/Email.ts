import nodemailer, { Transporter } from "nodemailer";

import getEmailTemplate from "./getEmailTemplate";

interface User {
  email: string;
}

export default class Email {
  private to: string;
  private url: string;
  private templateFile: string;
  private transporter: Transporter;

  constructor(user: User, url: string) {
    this.to = user.email;
    this.url = url;
    this.templateFile = getEmailTemplate();

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      from: process.env.EMAIL_FROM,
    });
  }

  async sendMagicLink(): Promise<void> {
    const mailOptions = {
      from: `Meeterpop <${process.env.EMAIL_FROM}>`,
      to: this.to,
      subject: "Your login code is valid for 10 minutes",
      html: this.templateFile
        .replace(/{{url}}/g, this.url)
        .replace(/{{email}}/g, this.to),
    };

    await new Promise<void>((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(`ERROR 🔥🔥 ${err.message}`);
          reject(err);
        } else {
          console.log(`Email sent: ${info.response}`);
          resolve();
        }
      });
    });
  }
}
