import { resolve } from 'path';

import sassMiddleware from 'node-sass-middleware';

export default () =>
  sassMiddleware({
    src: resolve('./src/public/'),
    dest: resolve('./src/public/'),
    debug: true,
    outputStyle: 'compressed',
    force: true,
    includePaths: ['node_modules'],
  });
