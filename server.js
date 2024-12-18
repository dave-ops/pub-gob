// server.js
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const { Server } = require('ws');
const routes = require('./routes.js')

// Load environment variables if using them
require('dotenv').config();

const MUD = require('./src/MUD');
const config = require('./src/config');

const PORT = process.env.PORT || config.server.port;


const mud = new MUD();
mud.listen(PORT).then(() => console.log('mud started'));

// Handle graceful shutdown or other global events
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  // Here you might add cleanup logic like saving game state, closing connections, etc.
  server.close(() => {
    process.exit(0);
  });
});