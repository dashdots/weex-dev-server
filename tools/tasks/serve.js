import path from 'path';
import { spawn } from 'child_process';
import webpackConfig from '../webpack.config';
import format from '../lib/format-time';

let server, pending = true;
const [, ,serverConfig] = webpackConfig;
const serverPath = path.join(serverConfig.output.path, serverConfig.output.filename);

const onServerStdout = data => {
  process.stdout.write(`${format(new Date)} `);
  process.stdout.write(data);
};

const onServerExit = (code, signal) => {
  if (pending) {
    throw new Error(`Server terminated unexpectedly with code: ${code} signal: ${signal}`);
  }
};

const killServer = () => {
  server.kill('SIGTERM');
};

const serve = () => new Promise((resolve) => {
  if (server) {
    killServer();
  }

  server = spawn('node', [serverPath], {
    env: Object.assign({ NODE_ENV: 'development' }, process.env),
    silent: false,
    stdio:['pipe', 'pipe', 'pipe', 'ipc'],
  });

  if (pending) {
    server.once('exit', onServerExit);
  }

  const onMessage = data => {
    if(typeof(data)==='object') {
      if(data.status = 'startup') {
        server.host = [data.host, data.port].join(':');
        server.stdout.removeListener('data', onServerStdout);
        server.stdout.on('data', x => process.stdout.write(x));
        pending = false;
        resolve(server);
      }
    }
  };

  server.on('message', onMessage);
  server.stdout.on('data', onServerStdout);
  server.stderr.on('data', x => process.stderr.write(x));

  return server;
});

process.on('exit', () => {
  if (server) {
    killServer();
  }
});

export default serve;
