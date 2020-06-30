/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';

const app = express();
dotenv.config();

const { ENV, PORT } = process.env;

if (ENV === 'development') {
  console.log('Development mode');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: PORT, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="assets/app.css" type="text/css">
      <title>Platzi Video</title>
    </head>
    <body>
      <div id="app"></div>
      <script src="assets/app.js" type="text/javascript"></script>
    </body>
  </html>`);
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server is running on port ${PORT}`);
});
