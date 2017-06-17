import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WriteFilePlugin from 'write-file-webpack-plugin';
import url from 'url';
import querystring from 'querystring';
import runServer from './serve';
import {isDebug} from '../lib/env';
import webpackConfig from '../webpack.config';

const [weexConfig, clientConfig, serverConfig] = webpackConfig;

async function hotBundle() {
  await new Promise((resolve) => {
    serverConfig.plugins.push(new WriteFilePlugin({log: false}));

    if (isDebug) {
      clientConfig.entry.client = [...new Set([
        'babel-polyfill',
        'webpack-hot-middleware/client',
      ].concat(clientConfig.entry.client))];
      clientConfig.output.filename = clientConfig.output.filename.replace('[chunkhash', '[hash');
      clientConfig.output.chunkFilename = clientConfig.output.chunkFilename.replace('[chunkhash', '[hash');
      const {query} = clientConfig.module.rules.find(x => x.loader === 'babel-loader');
      clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
      clientConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
    }

    const bundler = webpack(webpackConfig);

    const wpMiddleware = webpackDevMiddleware(bundler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
    });

    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0]);

    let handleBundleComplete = async () => {
      handleBundleComplete = stats => !stats.stats[1].compilation.errors.length && runServer();

      const server = await runServer();
      const bs = browserSync.create();

      bs.init({
        ...isDebug ? {} : {notify: false, ui: false},

        open: false,
        proxy: {
          target: server.host,
          middleware: [
            {
              route: '/__open-stack-frame-in-editor',
              handle(req, res) {
                const query = querystring.parse(url.parse(req.url).query);
                launchEditor(query.fileName, query.lineNumber);
                res.end();
              },
            },
            wpMiddleware,
            hotMiddleware,
          ],
          proxyOptions: {
            xfwd: true,
          },
        },
      }, resolve);
    };

    bundler.plugin('done', stats => handleBundleComplete(stats));
  });
}

export default hotBundle;
