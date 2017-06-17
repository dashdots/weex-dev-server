import { isDebug, isVerbose, buildPath, basePath } from '../lib/env';
import rules from './rules';
import path from 'path';

const config = {
  context: basePath,

  output: {
    path: path.resolve(buildPath, 'public/assets'),
    publicPath: '/assets/',
    pathinfo: isVerbose,
    devtoolModuleFilenameTemplate: info => path.resolve(info.absoluteResourcePath),
  },

  module: {
    rules,
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
    performance: true,
    entrypoints: true,
  },
};

export default config;
