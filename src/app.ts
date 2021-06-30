import { resolve } from 'path';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import flash from 'connect-flash';
import exphbs from 'express-handlebars';
import methodOverride from 'method-override';
import passport from 'passport';

import { AppModule } from './core/app.module';
import { handlebarHelpers } from './settings/handlebars';
import scss from './settings/scss';
import session from './settings/session';

export async function getApp() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(scss());
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.engine(
    '.hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'default',
      layoutsDir: resolve('./src/views/layouts'),
      helpers: handlebarHelpers,
    }),
  );
  app.setViewEngine('hbs');
  app.use(methodOverride('_method'));
  app.use(session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  app.enableCors({
    origin: process.env.CLIENT_HOST || '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  return app;
}
