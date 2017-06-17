import { isDebug, srcPath } from '../../lib/env';

export default [
  {
    // Inline Styles
    test: /\.css$/,
    include: [srcPath],
    use: [
      {
        loader: 'isomorphic-style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: isDebug,
          modules: true,
          localIdentName: isDebug ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
          minimize: !isDebug,
          discardComments: { removeAll: true },
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('postcss-import')(),
            require('postcss-custom-properties')(),
            require('postcss-calc')(),
            require('postcss-nesting')(),
            require('postcss-nested')(),
            require('autoprefixer')(/* package.json/browserslist */),
          ],
        },
      },
    ],
  },

  {
    // External Styles
    test: /\.css$/,
      exclude: [srcPath],
      use: [
      {
        loader: 'isomorphic-style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDebug,
          // CSS Modules Disabled
          modules: false,
          minimize: !isDebug,
          discardComments: { removeAll: true },
        },
      },
    ],
  }
];
