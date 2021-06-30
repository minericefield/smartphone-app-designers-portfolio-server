import stream from 'stream';

import { Matches, Max, ValidateIf } from 'class-validator';
import { Express } from 'express';

export class UpdateDesignerFileDto implements Express.Multer.File {
  fieldname: string;

  @ValidateIf((o: UpdateDesignerFileDto) => !!o.fieldname)
  @Matches(/\.(jpg|jpeg|png|gif|svg)$/, {
    message: 'image must be image',
  })
  originalname: string;

  encoding: string;
  mimetype: string;

  @ValidateIf((o: UpdateDesignerFileDto) => !!o.originalname)
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
