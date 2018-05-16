import { resolve } from 'path';
import webpack from 'webpack';
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const buildPlugins = env => {
  const plugins = [];
  if (env.development) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  // if (env.analyze) {
  //   plugins.push(new BundleAnalyzerPlugin());
  // }
  return plugins;
};

const buildEntries = () => {
  const app = [];
  app.push(resolve(__dirname, '..', 'browser', 'index.js'));
  return { app };
};

const moduleRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
];

const buildOptimization = env => {
  if (env.development) {
    return undefined;
  }

  return {
    splitChunks: {
      chunks: 'all',
    },
  };
};

export default env => ({
  devtool: env.development ? 'inline-source-map' : undefined,
  mode: env.development ? 'development' : 'production',
  entry: buildEntries(env),
  output: {
    path: resolve(__dirname, '..', '..', 'dist'),
    filename: 'static/[name].[hash:6].js',
    chunkFilename: 'static/[id].[chunkhash:6].js',
    pathinfo: env.development,
    publicPath: '/',
  },
  module: {
    rules: moduleRules,
  },
  plugins: buildPlugins(env),
  optimization: buildOptimization(env),
});
