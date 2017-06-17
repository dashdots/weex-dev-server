import { isDebug, srcPath } from '../../lib/env.js';
import pkg from '../../../package.json'

export default {
  test: /\.vue/,
  loader: 'vue-loader',
  include: [
    srcPath,
  ],
};
