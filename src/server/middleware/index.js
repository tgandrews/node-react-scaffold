import { resolve } from 'path';

import morgan from 'koa-morgan';
import koaWebpack from 'koa-webpack';
import koaStatic from 'koa-static';
import bodyparser from 'koa-bodyparser';

import webpackConfig from '../../config/webpack.config.ui';

const isDevelopment = process.env.NODE_ENV !== 'development';

const fileMiddleware = () => {
  if (isDevelopment) {
    const objectEntryConfig = webpackConfig({ development: true });
    const config = {
      ...objectEntryConfig,
      entry: {
        main: [objectEntryConfig.entry.main],
      },
    };

    return koaWebpack({
      dev: { serverSideRender: true },
      config,
    });
  }
  return koaStatic(resolve(__dirname, '..', '..', '..', 'dist'));
};

export default app =>
  app
    .use(morgan('dev'))
    .use(bodyparser())
    .use(fileMiddleware());
