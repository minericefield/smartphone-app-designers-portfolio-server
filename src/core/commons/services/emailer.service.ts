import awsSdk from 'aws-sdk';
import nodeMailer from 'nodemailer';

export class MailhogEmailerService {
  send(to: string, subject: string, content: string) {
    return new Promise((resolve, reject) => {
      const smtp = nodeMailer.createTransport({
        host: 'mailhog',
        port: 1025,
        auth: {
          user: 'admin',
          pass: 'password',
        },
      });

      const mailhogOptions = {
        from: 'from@development.com',
        to,
        subject,
        html: content,
      };

      smtp.sendMail(mailhogOptions, (error, info) => {
        smtp.close();

        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

export class AwsSdkEmailerService {
  send(to: string, subject: string, content: string) {
    return new Promise((resolve, reject) => {
      const awsSes = new awsSdk.SES({
        accessKeyId: process.env.SES_IAM_USER_ACCESS_KEY_ID,
        secretAccessKey: process.env.SES_IAM_USER_SECRET_ACCESS_KEY,
        region: 'ap-northeast-1',
      });
      const sesOptions = {
        Source: process.env.EMAIL_FROM,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Html: {
              Charset: 'utf-8',
              Data: content,
            },
          },
          Subject: {
            Charset: 'utf-8',
            Data: subject,
          },
        },
      };
      awsSes.sendEmail(sesOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  }
}

export const EMAIL_SERVICE_PROVIDER_KEY = 'EMAIL_SERVICE_PROVIDER_KEY';

export const EmailServiceProvider = {
  provide: EMAIL_SERVICE_PROVIDER_KEY,
  useClass:
    process.env.NODE_ENV === 'production'
      ? AwsSdkEmailerService
      : MailhogEmailerService,
};
