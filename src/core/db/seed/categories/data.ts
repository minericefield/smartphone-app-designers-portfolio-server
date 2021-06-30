import { CATEGORIES, CategoriesKey } from '../../../commons/constants';
import { Category } from '../../../features/categories/schemas/category.schema';

export function getData() {
  const data: Category[] = [];

  (Object.keys(CATEGORIES) as CategoriesKey[]).forEach((name) => {
    data.push({
      _id: CATEGORIES[name],
      name,
    });
  });

  return data;
}
