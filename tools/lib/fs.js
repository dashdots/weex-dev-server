import fse from 'fs-extra';

export const readFile = file => fse.readFile(file, 'utf8');

export const writeFile = (file, contents) => fse.writeFile(file, contents, 'utf8');

export const renameFile = fse.move;

export const copyFile = fse.copy;

export const makeDir = fse.ensureDir;

export const moveDir = fse.move;

export const copyDir = fse.copy;

export const cleanDir =fse.emptyDir;

export default {
  readFile,
  writeFile,
  renameFile,
  copyFile,
  makeDir,
  copyDir,
  moveDir,
  cleanDir,
};
