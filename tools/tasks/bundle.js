import webpack from 'webpack';
import webpackConfig from '../webpack.config/index';

const [, {stats:clientStats}] = webpackConfig;

function bundle() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.info(stats.toString(clientStats));
      return resolve();
    });
  });
}

export default bundle;
