import Koa from 'koa';

import logInit from './logger';
import addMiddleware from './middleware';
import buildRouter from './router';

export default async () => {
  const logger = logInit();
  const app = await addMiddleware(new Koa());
  const router = await buildRouter();
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT);
  logger.info(`Listening on ${process.env.PORT}`);
};
