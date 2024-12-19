'use strict'

const path = require('path');
const WebSocket = require('ws');
const Message = require('./models/Message.js');
const { MudError } = require('./errors');

const AuthFlow = {
  None: { id: 0, value: 0, message: 'Fare thee well!' },
  Connected: { id: 1, value: 1, message: 'Enter character name:' },
  CharacterCreation: { id: 2, value: 2, message: 'Select Race:' },
  Login: { id: 3, value: 3, message: 'Enter password:' },
  InGame: { id: 4, value: 4, message: 'Welcome' },
};

class WebSocketServer {
  constructor() {
    this.wss = null;
    this.auth_state = AuthFlow.None;
  }

  attachToServer(server) {
    console.log('attach to server');
    if (this.wss) {
      console.log('server already attached')
      return;
    }
    console.log({
      server
    });

    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(ws) {
    console.log('incoming connection');

    ws.on('message', async (message) => {
      console.log('on message');
      const cmd_msg = `${message}`.trim();

      if (this.auth_state === AUTH_UNKNOWN) {
          const result = await this.handleLogin(ws, cmd_msg);
          return result;
      }

      this.handleMessage(ws, message);
    });

    ws.on('close', () => {
      console.log('on close');
      return this.handleClose(ws)
    });

    ws.on('pong', () => {
      console.log('on pong');
      return this.handlePong(ws);
    });

    if (!this.authenticated) {
      console.log('not authenticated');
      ws.send('hmmmmmmm');
    }
  }

  handleLogin = async (ws, name) => {
    try {
      const playerFilePath = path.join(this.playersPath, `${name}.json`);
      const playerExists = await fs.access(playerFilePath).then(() => true).catch(() => false);

      if (playerExists) {
        ws.send(JSON.stringify({ type: 'login', message: 'Enter password:' }));
        // Here you would listen for the next message to check the password
        ws.once('message', async (message) => {
          const data = JSON.parse(message);
          if (data.type === 'password') {
            const playerData = await fs.readFile(playerFilePath, 'utf-8');
            const player = JSON.parse(playerData);
            if (data.password === player.password) {
              ws.send(JSON.stringify({ type: 'login', message: 'Login successful!' }));
              ws.player = player; // Attach player data to the WebSocket for future use
            } else {
              ws.send(JSON.stringify({ type: 'login', message: 'Incorrect password. Try again.' }));
              await this.handleLogin(ws, name); // Recursively ask for login again
            }
          }
        });
      } else {
        ws.send(JSON.stringify({ type: 'login', message: 'Welcome new adventurer.' }));
        // Here you might want to create a new player file
        const newPlayer = {
          name: name,
          // Other initial player properties
        };
        await fs.writeFile(playerFilePath, JSON.stringify(newPlayer, null, 2));
        ws.player = newPlayer; // Attach new player data
      }
    } catch (error) {
      console.error('Error during login:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'An error occurred during login.' }));
    }
  }

  handleMessage(ws, message) {
    console.log(`handle message ${message}`);
    const cmd = `${message}`;

    // Parse the message and handle game logic
    // Delegate to World for processing commands, etc.
    if (this.world) {
      this.world.processCommand(ws, cmd);
    }
  }

  handleClose(ws) {
    console.log('handle close');
    if (ws.player) {
      this.world.removePlayer(ws.player);
    }
  }

  handlePong(ws) {
    console.log('ping');
    if (ws.player) {
      ws.player.connected = true;
    }
  }

  // These methods would be called by World or other components
  broadcastToAll(message) {
    console.log('broadcast to all');
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  sendToClient(client, message) {
    console.log('send to client');
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
}

module.exports = WebSocketServer;