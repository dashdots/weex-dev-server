import cp from 'child_process';
import run from './lib/run-task';
import clean from './clean';
import copy from './copy';
import bundle from './bundle';
import pkg from '../../package.json';
import {isStatic, isDocker} from '../lib/env';

async function build() {
  await run(clean);
  await run(copy);
  await run(bundle);

  if (isStatic) {
  }

  if (isDocker) {
    cp.spawnSync('docker', ['build', '-t', pkg.name, '.'], { stdio: 'inherit' });
  }
}

export default build;
