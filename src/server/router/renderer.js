import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import { state } from './static';

import App from '../../ui/App';

export default ctx => {
  const routerContext = {};
  const result = renderToString(
    <StaticRouter location={ctx.req.url} context={routerContext}>
      <App />
    </StaticRouter>
  );
  ctx.status = routerContext.status || 200;
  ctx.body = `<html>
    <body>
      <div id="content">${result}</div>
      <script defer src="${state.entry}"></script>
    </body>
  </html>`;
};
