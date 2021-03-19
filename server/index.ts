import express from "express";
import routes from './routes/index'
import nextApp from './nextApp'

const port = process.env.PORT || 3000;

const server = express();
server.use('/', routes);

(async () => {
  try {
    await nextApp.prepare();

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();