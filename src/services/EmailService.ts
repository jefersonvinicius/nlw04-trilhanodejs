import nodemailer from 'nodemailer';

export class EmailService {
  static send(to: string, subject: string, body: string): Promise<EmailResponse> {
    return new Promise((resolve, reject) => {
      nodemailer.createTestAccount((error, account) => {
        if (error) {
          throw new Error(error.message);
        }

        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        const message = {
          from: 'Jeferson Vinícius <noreply@jefersonvinicius.com>',
          to: to,
          subject: subject,
          html: body,
        };

        transporter.sendMail(message, (error, info) => {
          if (error) {
            reject(error);
          }

          resolve({
            messageId: info.messageId,
            previewUrl: nodemailer.getTestMessageUrl(info) || '',
          });
        });
      });
    });
  }
}

type EmailResponse = {
  messageId: string;
  previewUrl: string;
};
