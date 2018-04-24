import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';

import logInit from './logger';
import App from '../ui/App';

const logger = logInit();

export default ctx => {
  logger.info(`URL: ${ctx.req.url}`);
  const routerContext = {};
  const result = renderToString(
    <StaticRouter location={ctx.req.url} context={routerContext}>
      <App />
    </StaticRouter>
  );
  logger.info('Router context', JSON.stringify(routerContext, false, 2));
  ctx.status = routerContext.status;
  ctx.body = `<html><body>${result}</body></html>`;
};
