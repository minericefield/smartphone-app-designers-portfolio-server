import sharp from 'sharp';

import { DESIGN_SIZE } from '../constants';

export class ImageResizeService {
  resize(buffer: Buffer, size = DESIGN_SIZE) {
    return sharp(buffer).resize(size.width, size.height).toBuffer();
  }
}
