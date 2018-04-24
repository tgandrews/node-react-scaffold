import Koa from 'koa';

import logInit from './logger';
import renderer from './renderer';

export default async () => {
  const logger = logInit();
  // const app = await addMiddleware(new Koa());
  const app = new Koa();
  app.use(renderer).listen(process.env.PORT);

  logger.info(`Listening on ${process.env.PORT}`);
};
