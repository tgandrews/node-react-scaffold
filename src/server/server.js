import Koa from 'koa';

import logInit from '$/utils/logger';
// import router from '$/router';

export default async () => {
  const logger = logInit();
  // const app = await addMiddleware(new Koa());
  const app = new Koa();
  app
    // .use(router.routes())
    // .use(router.allowedMethods())
    .listen(process.env.PORT);

  logger.info(`Listening on ${process.env.PORT}`);
};
