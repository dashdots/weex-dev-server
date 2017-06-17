import path from 'path';
import chokidar from 'chokidar';
import { writeFile, copyFile, makeDir, copyDir, cleanDir } from '../lib/fs';
import { isWatch } from '../lib/env';
import pkg from '../../package.json';
import format from '../lib/format-time';

async function copy() {
  await makeDir('build');
  await Promise.all([
    writeFile('build/package.json', JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node server.js',
      },
    }, null, 2)),
    copyDir('public', 'build/public'),
    copyFile('LICENSE.txt', 'build/LICENSE.txt'),
    copyFile('node_modules/vue/dist/vue.js', 'build/public/vue.js'),
    copyFile('node_modules/vue/dist/vue.runtime.js', 'build/public/vue.runtime.js'),
    copyFile('node_modules/weex-vue-render/dist/index.js', 'build/public/weex-vue-render.js'),
    copyFile('node_modules/phantom-limb/index.js', 'build/public/phantom-limb.js'),
    copyFile('node_modules/qrcode/build/qrcode.js', 'build/public/qrcode.js'),
  ]);

  if (isWatch) {
    const watcher = chokidar.watch([
      'public/**/*',
    ], { ignoreInitial: true });

    watcher.on('all', async (event, filePath) => {
      const start = new Date();
      const src = path.relative('./', filePath);
      const dist = path.join('build/', src.startsWith('src') ? path.relative('src', src) : src);
      switch (event) {
        case 'add':
        case 'change':
          await makeDir(path.dirname(dist));
          await copyFile(filePath, dist);
          break;
        case 'unlink':
        case 'unlinkDir':
          cleanDir(dist);
          break;
        default:
          return;
      }
      const end = new Date();
      const time = end.getTime() - start.getTime();
      console.info(`${format(end)} ${event} '${dist}' after ${time} ms`);
    });
  }
}

export default copy;
