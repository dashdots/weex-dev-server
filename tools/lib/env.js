import path from 'path';

export const isDebug = !process.argv.includes('--release');
export const isVerbose = process.argv.includes('--verbose');
export const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');
export const isStatic = process.argv.includes('--static');
export const isDocker = process.argv.includes('--docker');
export const isWatch = process.argv.includes('--watch');

export const basePath = path.resolve(__dirname, '../../');
export const srcPath = path.resolve(basePath, 'src');
export const buildPath = path.resolve(basePath, 'build');
export const modulePath = path.resolve(basePath, 'node_modules');

export default {
  isDebug,
  isVerbose,
  isAnalyze,
  basePath,
  srcPath,
  buildPath,
  modulePath,
  isStatic,
  isDocker,
  isWatch,
};
