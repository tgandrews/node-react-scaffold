import Koa from 'koa';

import logInit from '$/server/logger';
import renderer from '$/server/renderer';

export default async () => {
  const logger = logInit();
  // const app = await addMiddleware(new Koa());
  const app = new Koa();
  app.use(renderer).listen(process.env.PORT);

  logger.info(`Listening on ${process.env.PORT}`);
};
