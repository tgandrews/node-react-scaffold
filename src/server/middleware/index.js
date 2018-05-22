import morgan from 'koa-morgan';
import koaWebpack from 'koa-webpack';
import koaStatic from 'koa-static';
import { resolve } from 'path';

import webpackConfig from '../../config/webpack.config.ui';

const isDevelopment = process.env.NODE_ENV === 'development';

export default app => {
  const a = app.use(morgan('dev'));
  if (isDevelopment) {
    a.use(
      koaWebpack({
        dev: { serverSideRender: true },
        config: webpackConfig({ development: true }),
      })
    );
  } else {
    a.use(koaStatic(resolve(__dirname, '..', '..', '..', 'dist')));
  }
  return a;
};
