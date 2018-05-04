import webpack from 'webpack';
import MemoryFS from 'memory-fs';
import { resolve } from 'path';

import logInit from '../../logger';
import buildConfig from '../../../config/webpack.config';

const logger = logInit();

export const state = {
  entry: undefined,
};

const fs = new MemoryFS();

const webpackConfig = buildConfig({ development: true });
const {
  output: { path: basePath },
} = webpackConfig;
logger.info(JSON.stringify(webpackConfig, undefined, 2));
const compiler = webpack(webpackConfig);
compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
  if (err) {
    logger.error(err.stack || err);
    if (err.details) {
      logger.error(err.details);
    }
  }
  try {
    const {
      compilation: { entrypoints },
    } = stats;
    if (!entrypoints) {
      return;
    }

    const {
      runtimeChunk: { files },
    } = entrypoints.get('app');
    const entry = files[0];
    state.entry = `/${entry}`;
    logger.info(basePath, state.entry);
  } catch (e) {
    logger.error(e);
  }
});
// compiler.hooks.done.tap('StaticDev', stats => {
//   logger.info('done');
//
// });

export default ctx => {
  const resolvedPath = resolve(basePath, ctx.req.url.slice(1));
  try {
    const stat = fs.statSync(resolvedPath);
    if (!stat.isFile()) {
      logger.error(`Not file: ${resolvedPath}`);
      ctx.status = 404;
      ctx.body = '';
      return;
    }

    ctx.body = fs.readFileSync(resolvedPath);
    ctx.type = 'application/javascript; charset=utf-8';
  } catch (e) {
    logger.error(`Error looking for ${resolvedPath}: ${e}`);
    ctx.status = 404;
    ctx.body = '';
  }
};
