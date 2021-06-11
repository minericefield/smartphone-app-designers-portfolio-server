import { resolve } from 'path';

import { Designer } from '../../../features/designer/schemas/designer.schema';

export function getData() {
  const data: Designer =
    process.env.NODE_ENV !== 'production'
      ? {
          name: 'NAME',
          email: 'xxx@example.com',
          descriptionHeading: 'DESCRIPTION HEADING',
          description: 'DESCRIPTION DESCRIPTION DESCRIPTION',
          file: resolve('./src/core/db/seed/designer/designer.png'),
          baseColor: '#eac7c7',
        }
      : null;

  return data;
}
