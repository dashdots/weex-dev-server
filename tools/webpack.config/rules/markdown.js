import path from 'path';

export default {
  test: /\.md$/,
  loader: path.resolve(__dirname, '../loaders/markdown.loader.js'),
};

