import format from '../../lib/format-time';

export default function runTask(fn, options) {
  const task = typeof fn.default === 'undefined' ? fn : fn.default;
  const start = new Date();
  console.info(
    `${format(start)} Starting '${task.name}${options ? ` (${options})` : ''}'...`,
  );
  return task(options).then((resolution) => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.info(
      `${format(end)} Finished '${task.name}${options ? ` (${options})` : ''}' after ${time} ms`,
    );
    return resolution;
  });
}
