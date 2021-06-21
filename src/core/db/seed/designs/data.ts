import { resolve } from 'path';

import { CATEGORIES } from '../../../commons/constants';
import { Design } from '../../../features/designs/schemas/design.schema';

export function getData() {
  let data: Omit<Design, '_id'>[] = [];

  if (process.env.NODE_ENV !== 'production') {
    data = [
      {
        titleHeading: 'TITLE HEADING',
        title: 'TITLE',
        descriptionHeading: 'DESCRIPTION HEADING',
        description:
          'DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION',
        file: resolve('./src/core/db/seed/designs/uis/5.png'),
        category: CATEGORIES['UI DESIGN'],
        baseColor: '#60c1e1',
        isPublic: 1,
      },
      {
        titleHeading: 'TITLE HEADING TITLE HEADING TITLE HEADING',
        title: 'TITLE',
        descriptionHeading: 'DESCRIPTION HEADING DESCRIPTION HEADING',
        description: 'DESCRIPTION',
        file: resolve('./src/core/db/seed/designs/uis/6.png'),
        category: CATEGORIES['UI DESIGN'],
        baseColor: '#f0cb47',
        isPublic: 1,
      },
      {
        titleHeading: '',
        title: '',
        descriptionHeading: 'TEST',
        description: 'TEST',
        file: resolve('./src/core/db/seed/designs/uis/7.png'),
        category: CATEGORIES['UI DESIGN'],
        baseColor: '#76d085',
        isPublic: 1,
      },
      {
        titleHeading: 'EXAMPLE',
        title: 'RED',
        descriptionHeading: 'COLOR RED',
        description:
          'COLOR COLOR COLOR COLOR COLOR COLOR COLOR COLOR COLOR COLOR COLOR COLOR',
        file: resolve('./src/core/db/seed/designs/uis/8.png'),
        category: CATEGORIES['UI DESIGN'],
        baseColor: '#cc1e1e',
        isPublic: 1,
      },
      {
        titleHeading: 'TITLE HEADING',
        title: 'TITLE',
        descriptionHeading: 'DESCRIPTION HEADING',
        description: 'DESCRIPTION 1234567890 1234567890',
        file: resolve('./src/core/db/seed/designs/graphics/1.png'),
        category: CATEGORIES['GRAPHIC DESIGN'],
        baseColor: '#e07ee2',
        isPublic: 1,
      },
      {
        titleHeading: 'TITLE HEADING',
        title: 'TITLE',
        descriptionHeading: 'DESCRIPTION HEADING',
        description: 'SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE SAMPLE',
        file: resolve('./src/core/db/seed/designs/graphics/2.png'),
        category: CATEGORIES['GRAPHIC DESIGN'],
        baseColor: '#dc6138',
        isPublic: 1,
      },
      {
        titleHeading: 'TITLE HEADING',
        title: 'TITLE',
        descriptionHeading: 'DESCRIPTION HEADING',
        description: 'DESCRIPTION',
        file: resolve('./src/core/db/seed/designs/graphics/3.png'),
        category: CATEGORIES['GRAPHIC DESIGN'],
        baseColor: '#9ee9f5',
        isPublic: 1,
      },
      {
        titleHeading: 'GRAPHIC DESIGN',
        title: 'TITLE',
        descriptionHeading: 'GRAPHIC DESIGN DESCRIPTION HEADING',
        description:
          'GRAPHIC DESIGN GRAPHIC DESIGN GRAPHIC DESIGN GRAPHIC DESIGN GRAPHIC DESIGN GRAPHIC DESIGN GRAPHIC DESIGN',
        file: resolve('./src/core/db/seed/designs/graphics/4.png'),
        category: CATEGORIES['GRAPHIC DESIGN'],
        baseColor: '#666dd6',
        isPublic: 1,
      },
    ];
  }

  return data;
}
