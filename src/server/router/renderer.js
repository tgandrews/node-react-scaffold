import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

import React from 'react';
import { StaticRouter } from 'react-router';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Loadable from '@7rulnik/react-loadable';
import { getBundles } from '@7rulnik/react-loadable/webpack';

import schema from '../graphql/schema';

import App from '../../ui/App';

let stats;
let main;
if (process.env.USE_BUILT_UI === 'true') {
  const distPath = resolve(__dirname, '..', '..', '..', 'dist');
  stats = JSON.parse(
    readFileSync(resolve(distPath, 'react-loadable.json'), 'utf8')
  );
  [main] = readdirSync(resolve(distPath, 'static')).filter(
    fileName => fileName.startsWith('main.') && fileName.endsWith('.js')
  );
}

export default async ctx => {
  const client = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  });

  const routerContext = {};
  const modules = [];
  const Component = (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ApolloProvider client={client}>
        <StaticRouter location={ctx.req.url} context={routerContext}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </Loadable.Capture>
  );

  const result = await renderToStringWithData(Component);
  ctx.status = routerContext.status || 200;

  let files;
  if (stats) {
    const uniqueModules = [...new Set(modules)];
    const bundleFileNames = getBundles(stats, uniqueModules).map(
      bundle => bundle.file
    );
    files = [main, ...bundleFileNames];
  } else if (ctx.state && ctx.state.webpackStats) {
    files = ctx.state.webpackStats.toJson().entrypoints.main.assets;
  }

  const scriptTags = files
    .map(file => `<script src="/static/${file}"></script>`)
    .join('');

  const state = JSON.stringify(client.extract()).replace(/</g, '\\u003c');

  ctx.body = `<html>
    <body>
      <div id="content">${result}</div>
      <script>window.__APOLLO_STATE__=${state};</script>
      ${scriptTags}
      <script>window.main()</script>
    </body>
  </html>`;
};
