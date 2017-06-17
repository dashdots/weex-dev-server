import { isDebug, srcPath } from '../../lib/env.js';
import pkg from '../../../package.json'

export default {
  test: /\.js$/,
    loader: 'babel-loader',
    include: [
      srcPath,
    ],
    query: {
      cacheDirectory: isDebug,
      babelrc: false,
      presets: [
      ['env', {
        targets: {
          browsers: pkg.browserslist,
        },
        modules: false,
        useBuiltIns: false,
        debug: false,
      }],
      'stage-2',
      'flow',
    ],
      plugins: [
    ],
  },
};
