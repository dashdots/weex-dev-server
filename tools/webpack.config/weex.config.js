import path from 'path';
import { isDebug, isAnalyze, isVerbose, buildPath } from '../lib/env';
import config from './base.config';
import AssetsPlugin from 'assets-webpack-plugin';
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const weexConfig = {
  ...config,

  name: 'weex',
  target: 'web',

  entry: {
    weex: ['./src/app.js'],
  },

  output: {
    ...config.output,
    filename: 'app.weex.js',
  },

  module: {
    ...config.module,

    // Override babel-preset-env configuration for Node.js
    rules: config.module.rules.map(rule => (rule.loader !== 'vue-loader' ? rule : {
      ...rule,
      loader: 'weex-loader',
    })),
  },


  plugins: [
    new ProgressBarPlugin({
      format: `[:bar] :percent`,
      width: 100,
      incomplete: '░',
      complete: '█',
    }),

    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),

    ...isDebug ? [
    ] : [
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
          screw_ie8: true, // doesn't support IE8
          warnings: isVerbose,
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ],

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin({
      banner: '// { "framework": "Vue" }\n',
      raw: true,
      entryOnly: false,
    }),
  ],

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: false,

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

export default weexConfig;
