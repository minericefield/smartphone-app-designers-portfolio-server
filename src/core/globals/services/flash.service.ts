import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export const FLASH_KEY = 'FLASH_KEY';

export type FlashData = Record<string, any> | null;

@Injectable()
export class FlashService {
  store(request: Request, data: FlashData) {
    request.flash(FLASH_KEY, JSON.stringify(data));
  }

  restore(request: Request): FlashData {
    const flashes = request.flash(FLASH_KEY);

    if (flashes.length) {
      const parsedFlashes = {};
      flashes.forEach((flashMessage) => {
        Object.assign(parsedFlashes, JSON.parse(flashMessage));
      });
      return parsedFlashes;
    } else {
      return null;
    }
  }
}
