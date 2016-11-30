# Boilerplate: ES6 - Node - Preact
## Features: live reload on server/client side - multithreading (with cluster) - basic API endpoint - ES6 with Babel

A basic/clean workflow with [ES6](https://github.com/lukehoban/es6features) on both front and backend. It uses Preact instead of React, it's lighter and has a few syntax improvements.
Server and client code is watched by nodemon and webpack and auto-reloads in every browser on change, which saves a lot of time.
I'm a big fan of [RxJS](https://github.com/ReactiveX/rxjs), and functional programming in general.
This setup combines really well with these kind of frameworks.

(and it's super fast)

Start coding in `src/main.js` or `public/src/views/app.js`.
The static content like `index.html bundle.js` in the `public` folder gets served by the Node server, with Express.
The API routes are defined in `src/router.js`, which describes the basic API endpoint.

Bundle size is 38kb. 13kb gzipped!

## Workflow
Server:  
- Node.js
- Express

Client:  
- Preact
- SASS

Task runners:
- Webpack
- Nodemon

## Requirements
node v5.0+: `npm i n -g && sudo n stable`  
nodemon: `npm i nodemon -g`  
webpack: `npm i webpack -g`  

If you get permission errors, try again with `sudo`  

## Installation
1. `git clone https://github.com/woudsma/node-preact-boilerplate.git`  
2. `mv node-preact-boilerplate your-project-name`  
3. `cd your-project-name`  
4. `npm install`  

## Usage
### Development
`npm run dev`  

Visit `http://localhost:3001` in your browser  
Find the API at `http://localhost:3000/api`, refresh the page a few times to see the page served from different CPU threads.  
Also try `http://localhost:3000/api/users`  

Server code is watched by nodemon, auto restarts on change.  
Client code is watched by webpack-dev-server, auto refreshes in browser on change.

### Production
`npm run production`  

Visit `http://localhost:3000` in your browser.   

You should probably add more code for production use.

### Usage on a cloud VPS
Nginx could be used as a web server, to serve the static content (instead of Express). Enabling gzip and caching in Nginx saves resources and bandwidth on high-traffic applications.
Using a reverse proxy (defined in the Nginx virtual host file), you can route the API requests to the Node server.
This way the Node server can still run on e.g. `http://127.0.0.1:3000`. This helps to load-balance your application even more, and let Nginx handle the static content, SSL (Let's Encrypt), etc. It also makes it easier to keep code synchronized to your local machine using git.

- [Nginx installation on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
- [Setting up Nginx server blocks](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04)

This is a sample virtual host file, `/etc/nginx/sites-available/test.com` (don't forget to link it to `sites-enabled`)
It serves static content from the public folder to your-site-name.com, and requests to api.your-site-name.com to the Node server. (using 2 server blocks)
You will also need to create an extra `A` record for the newly created `api.your-site-name.com` subdomain in your DNS configuration.
```
upstream node {
	server 127.0.0.1:3000;
}

server {
	listen 80;
	listen [::]:80;

	root /var/www/your-project-name/public;
	index index.html;

	server_name your-site-name.com www.your-site-name.com;

	location / {
		gzip on;
		try_files $uri $uri/ =404;
	}
}

server {
	listen 80;
	listen [::]:80;

	server_name api.your-site-name.com;

	location / {
                proxy_pass http://node/api;  # translates to: http://127.0.0.1:3000/api # remove these comments
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-NginX-Proxy true;

                proxy_redirect off;

                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade; # necessary for WebSocket connections, socket.io etc. # remove these comments
                proxy_set_header Connection "upgrade";
        }
}
```

## License

MIT
