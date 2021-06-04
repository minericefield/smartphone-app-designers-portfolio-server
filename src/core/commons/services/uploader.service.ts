import fs from 'fs';
import { resolve, join, basename } from 'path';

import awsSdk from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { Express } from 'express';

export class StaticDirUploaderService {
  static publicDir = './src/public';
  static imagesDir = '/designs-dev';
  static imagesDirResolved = resolve(
    join(
      StaticDirUploaderService.publicDir,
      StaticDirUploaderService.imagesDir,
    ),
  );

  upload(file: Express.Multer.File) {
    const date = new Date();
    const fileName = date.getTime() + file.originalname;
    const filePath = join(StaticDirUploaderService.imagesDir, fileName);
    const filePathResolved = join(
      StaticDirUploaderService.imagesDirResolved,
      fileName,
    );
    fs.writeFileSync(filePathResolved, file.buffer);
    return filePath;
  }

  remove(filePath: string) {
    const filePathResolved = resolve(
      StaticDirUploaderService.publicDir,
      filePath,
    );
    return new Promise<boolean>((resolve, reject) => {
      fs.unlink(filePathResolved, (error) => {
        reject(error);
      });
      resolve(true);
    });
  }
}

export class AwsSdkUploaderService {
  awsS3: awsSdk.S3;

  constructor() {
    this.awsS3 = new awsSdk.S3({
      accessKeyId: process.env.S3_IAM_USER_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_IAM_USER_SECRET_ACCESS_KEY,
      region: 'ap-northeast-1',
    });
  }

  async upload(file: Express.Multer.File) {
    const { Location } = await new Promise<ManagedUpload.SendData>(
      (resolve, reject) => {
        const date = new Date();
        const s3Options = {
          Bucket: process.env.S3_BUCKET,
          Key: date.getTime() + file.originalname,
          Body: file.buffer,
        };
        this.awsS3.upload(s3Options, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      },
    );

    return Location;
  }

  async remove(filePath: string) {
    const s3Options = {
      Bucket: process.env.S3_BUCKET,
      Key: basename(filePath),
    };
    return new Promise<boolean>((resolve, reject) => {
      this.awsS3.deleteObject(s3Options, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}

export const UPLOADER_SERVICE_PROVIDER_KEY = 'UPLOADER_SERVICE_PROVIDER_KEY';

export const UploaderServiceProvider = {
  provide: UPLOADER_SERVICE_PROVIDER_KEY,
  useClass:
    process.env.NODE_ENV === 'production'
      ? AwsSdkUploaderService
      : StaticDirUploaderService,
};
