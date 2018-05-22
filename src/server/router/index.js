import Router from 'koa-router';

import { addRoutes } from '../graphql';

import renderer from './renderer';

export default () => {
  const router = new Router();
  addRoutes(router);
  router.get('*', renderer);
  return router;
};
