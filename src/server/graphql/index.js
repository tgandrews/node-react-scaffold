import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import schema from './schema';

const isDevelopment = process.env.NODE_ENV === 'development';

// eslint-disable-next-line import/prefer-default-export
export const addRoutes = router => {
  router.post(
    '/graphql',
    graphqlKoa(ctx => ({
      schema,
      context: ctx,
    }))
  );
  if (isDevelopment) {
    router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));
  }
};
