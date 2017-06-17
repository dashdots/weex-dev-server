import run from './lib/run-task';
import clean from './clean';
import copy from './copy';
import hotBundle from './hot-bundle';

process.argv.push('--watch');

async function start() {
  await run(clean);
  await run(copy);
  await run(hotBundle);
}

export default start;
