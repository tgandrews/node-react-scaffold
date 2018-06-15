import Koa from 'koa';
import Loadable from '@7rulnik/react-loadable';

import logInit from './logger';
import addMiddleware from './middleware';
import buildRouter from './router';

export default async () => {
  const logger = logInit();
  const app = await addMiddleware(new Koa());
  const router = await buildRouter();
  logger.info('Loading components');
  await Loadable.preloadAll();
  logger.info('All components loaded');
  app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(process.env.PORT);
  logger.info(`Listening on ${process.env.PORT}`);
};
