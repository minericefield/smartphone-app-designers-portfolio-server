import { resolve } from 'path';

import { Designer } from '../../../features/designer/schemas/designer.schema';

export function getData() {
  const data: Omit<Designer, '_id'> =
    process.env.NODE_ENV !== 'production'
      ? {
          name: 'NAME',
          email: 'xxx@example.com',
          descriptionHeading: 'Graphic and UI Designer',
          description:
            'My name is... HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD HELLO WORLD',
          file: resolve('./src/core/db/seed/designer/designer.svg'),
          baseColor: '#eac8e9',
        }
      : null;

  return data;
}
