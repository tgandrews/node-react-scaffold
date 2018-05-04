import Router from 'koa-router';

import staticFiles from './static';
import renderer from './renderer';

export default () => {
  const router = new Router();
  router.get('/static/*', staticFiles);
  router.get('*', renderer);
  return router;
};
