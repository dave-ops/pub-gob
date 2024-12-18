// server.js
const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');
const { Server } = require('ws');
const routes = require('./routes.js')

// Load environment variables if using them
require('dotenv').config();
const RockMUD = require('./src/MUD');
const config = require('./src/config');

const PORT = process.env.PORT || config.server.port;

const app = express();
const server = http.createServer(app);
app.use(routes);
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For form data

// Instantiate and start the RockMUD server
// MUD expects to be given a server to attach to for WebSocket support
const mud = new RockMUD(server, config, () => {
  console.log('RockMUD server has started successfully.');
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown or other global events
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  // Here you might add cleanup logic like saving game state, closing connections, etc.
  server.close(() => {
    process.exit(0);
  });
});

// Instantiate and start the RockMUD server
const rockmud = new RockMUD(PORT, config, () => {
    console.log('RockMUD server has started successfully.');
  });
  
  // handle graceful shutdown or other global events
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    // Here you might add cleanup logic like saving game state, closing connections, etc.
    process.exit(0);
  });
  