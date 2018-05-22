import { readFileSync } from 'fs';
import { resolve } from 'path';

import React from 'react';
import { StaticRouter } from 'react-router';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';

import schema from '../graphql/schema';

import App from '../../ui/App';

let files;
if (process.env.NODE_ENV === 'production') {
  files = JSON.parse(
    readFileSync(
      resolve(__dirname, '..', '..', '..', 'webpack-stats.json'),
      'utf8'
    )
  ).entrypoints.app.assets;
}

export default async ctx => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  const routerContext = {};
  const Component = (
    <ApolloProvider client={client}>
      <StaticRouter location={ctx.req.url} context={routerContext}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  const result = await renderToStringWithData(Component);
  ctx.status = routerContext.status || 200;

  if (ctx.state && ctx.state.webpackStats) {
    files = ctx.state.webpackStats.toJson().entrypoints.app.assets;
  }

  const scriptTags = files
    .map(file => `<script defer src="/${file}"></script>`)
    .join('');

  const state = JSON.stringify(client.extract()).replace(/</g, '\\u003c');

  ctx.body = `<html>
    <body>
      <div id="content">${result}</div>
      <script>window.__APOLLO_STATE__=${state};</script>
      ${scriptTags}
    </body>
  </html>`;
};
