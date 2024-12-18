const express = require('express');
const http = require('http');
const fs = require('fs');
const routes = require('../routes.js');

class StaticWebServer {
    constructor() {
        this.app = express();
        this.app.use(routes);
        this.app.use(express.json());                         // json data
        this.app.use(express.urlencoded({ extended: true })); // form data
  }

  createServer() {
    console.log({ app: this.app });
    return http.createServer(this.app);
  }

}

module.exports = StaticWebServer;