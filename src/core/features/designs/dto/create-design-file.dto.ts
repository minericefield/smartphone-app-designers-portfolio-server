import stream from 'stream';

import { IsNotEmpty, Matches, Max } from 'class-validator';
import { Express } from 'express';

export class CreateDesignFileDto implements Express.Multer.File {
  fieldname: string;

  @IsNotEmpty({
    message: 'image should not be empty',
  })
  @Matches(/\.(jpg|jpeg|png|gif|svg)$/, {
    message: 'image must be image',
  })
  originalname: string;

  encoding: string;
  mimetype: string;

  @Max(10000000, {
    message: 'image is to large',
  })
  size: number;

  stream: stream.Readable;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
