import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import { createRenderer } from 'vue-server-renderer';
import Vue from 'vue';
import PreviewPage from './routes/preview.vue';
import NotFoundPage from './routes/notfound.vue';
import ErrorPage from './routes/error.vue';

const app = express();
const renderer = createRenderer();

const serverRender = vueComponent => new Promise((resolve, reject) =>
  renderer.renderToString(new Vue(vueComponent), (err, html) => {
    if(err) {
      reject(err);
    }
    resolve(`<!doctype html>\n${html}`);
  })
);

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


if (__DEV__) {
  app.enable('trust proxy');
}

app.get('/preview.html', async(req, res, next) => {
  try {
    const html = await serverRender(PreviewPage);
    res.status(200);
    res.send(html);
  } catch(err) {
    next(err);
  }
});

app.get('/error.html', async (req, res, next) => {
  try {
    throw new Error('Error page for test');
  } catch(err) {
    next(err);
  }
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const html = await serverRender(NotFoundPage);
    res.status(404);
    res.send(html);
  } catch(err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use(async (err, req, res, next) => { // eslint-disable-line no-unused-vars
  try {
    const html = await serverRender({
      template:`<error-page title="Internal Server Error" message="${err.message}"/>`,
      components: {
        ErrorPage
      }
    });
    console.error(pe.render(err));
    res.status(err.status || 500);
    res.send(html);
  } catch(err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
app.listen(config.port, () => {
  console.info(`The server is running at http://${config.host}:${config.port}/`);
  if(process.send) {
    process.send({
      host:config.host,
      port:config.port,
      status: 'startup',
    });
  }
});
