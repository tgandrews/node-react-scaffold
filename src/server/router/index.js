import Router from 'koa-router';

import renderer from './renderer';

export default () => {
  const router = new Router();
  router.get('*', renderer);
  return router;
};
