import fs from 'node:fs';
import { createServer } from 'node:http';

const { readFile } = fs;
const port = 8080;
const hostname = 'localhost';

const router = {
	'/': 'index.html',
	'/about': 'about.html',
	'/contact': 'contact-me.html',
	'/library-project': './pages/library-project.html',
	'/404': '404.html',
}

const server = createServer();

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

server.on('request', (request, response) => {
	const { url } = request;

	if (url in router) {
    readFile(router[url], (err, data) => {
			response.setHeader('Content-Type', 'text/html');
      response.statusCode = 200;
			response.end(data);
    });
  } else {
		readFile(router['/404'], (err, data) => {
			response.setHeader('Content-Type', 'text/html');
			response.statusCode = 404;
			response.end(data);
		});
  }
})