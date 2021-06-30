import { Module } from '@nestjs/common';

import { CategoriesModule } from '../../../features/categories/categories.module';

import { CategoriesSeedService } from './categories-seed.service';

@Module({
  imports: [CategoriesModule],
  providers: [CategoriesSeedService],
  exports: [CategoriesSeedService],
})
export class CategoriesSeedModule {}
