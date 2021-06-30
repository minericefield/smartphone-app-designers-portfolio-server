import { Injectable } from '@nestjs/common';

import { CategoriesService } from '../../../features/categories/categories.service';

import { getData } from './data';

@Injectable()
export class CategoriesSeedService {
  constructor(private readonly categoriesService: CategoriesService) {}

  run() {
    return Promise.all(
      getData().map(async (item) => await this.categoriesService.create(item)),
    );
  }
}
