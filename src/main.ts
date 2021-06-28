import './settings/env';
import { getApp } from './app';

async function bootstrap() {
  const app = await getApp();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`!!! Server listening on port ${port} !!!`);
}
bootstrap();
