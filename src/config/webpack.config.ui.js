import { resolve } from 'path';
import webpack from 'webpack';
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
import { ReactLoadablePlugin } from '@7rulnik/react-loadable/webpack';

const DIST_PATH = resolve(__dirname, '..', '..', 'dist');

const buildPlugins = env => {
  const plugins = [];
  if (env.development) {
    plugins.push(new webpack.NamedModulesPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  // if (env.analyze) {
  //   plugins.push(new BundleAnalyzerPlugin());
  // }
  if (env.production) {
    plugins.push(
      new ReactLoadablePlugin({
        filename: resolve(DIST_PATH, 'react-loadable.json'),
      })
    );
  }
  return plugins;
};

const moduleRules = [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              useBuiltIns: 'usage',
            },
          ],
          '@babel/preset-react',
        ],
        plugins: ['@7rulnik/react-loadable/babel'],
      },
    },
  },
];

export default env => ({
  devtool: env.development ? 'inline-source-map' : undefined,
  mode: env.development ? 'development' : 'production',
  entry: {
    main: resolve(__dirname, '..', 'browser', 'index.js'),
  },
  output: {
    path: DIST_PATH,
    filename: '[name].[hash:6].js',
    chunkFilename: '[name].[chunkhash:6].js',
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [['es2015', { modules: false }], 'react'],
            plugins: [
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-assign',
            ],
          },
        },
      },
    ],
  },
  plugins: buildPlugins(env),
});
