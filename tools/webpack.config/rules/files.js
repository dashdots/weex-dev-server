import { isDebug } from '../../lib/env.js';

export default [
  {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
    loader: 'file-loader',
    query: {
      name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
    },
  },
  {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      name: isDebug ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
      limit: 10000,
    },
  },
];
