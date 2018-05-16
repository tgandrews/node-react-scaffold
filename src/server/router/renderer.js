import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { readFileSync } from 'fs';
import { resolve } from 'path';

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

export default ctx => {
  const routerContext = {};
  const result = renderToString(
    <StaticRouter location={ctx.req.url} context={routerContext}>
      <App />
    </StaticRouter>
  );
  ctx.status = routerContext.status || 200;

  if (ctx.state && ctx.state.webpackStats) {
    files = ctx.state.webpackStats.toJson().entrypoints.app.assets;
  }

  const scriptTags = files
    .map(file => `<script defer src="/${file}"></script>`)
    .join('');

  ctx.body = `<html>
    <body>
      <div id="content">${result}</div>
      ${scriptTags}
    </body>
  </html>`;
};
