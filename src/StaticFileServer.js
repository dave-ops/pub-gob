const http = require('http');
const fs = require('fs');
const { loadRoutes } = require('../routes.js');

class StaticFileServer {
  createServer() {
    return http.createServer(this.handleRequest.bind(this));
  }

  handleRequest(req, res) {
      loadRoutes();
    // Logic for serving static files
    // ...
  }
}

module.exports = StaticFileServer;