const next = require('next');
const http = require('http');
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handleNextRequests = app.getRequestHandler();

app.prepare().then(() => {
  const server = new http.Server((req, res) => {
    handleNextRequests(req, res);
  });

  server.listen(port, err => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${port}`)
  });
});
