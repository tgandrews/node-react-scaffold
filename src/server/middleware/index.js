import { resolve } from 'path';

import morgan from 'koa-morgan';
import koaWebpack from 'koa-webpack';
import koaStatic from 'koa-static';
import bodyparser from 'koa-bodyparser';

import webpackConfig from '../../config/webpack.config.ui';

const isDevelopment = process.env.NODE_ENV === 'development';

const fileMiddleware = () =>
  isDevelopment
    ? koaWebpack({
        dev: { serverSideRender: true },
        config: webpackConfig({ development: true }),
      })
    : koaStatic(resolve(__dirname, '..', '..', '..', 'dist'));

export default app =>
  app
    .use(morgan('dev'))
    .use(bodyparser())
    .use(fileMiddleware());
