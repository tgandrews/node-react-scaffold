import React from 'react';
import { renderToString } from 'react-dom/server';

import App from '$/ui/App';

export default ctx => {
  ctx.status = 200;
  const result = renderToString(<App />);
  ctx.body = `<html><body>${result}</body></html>`;
};
