const WebSocket = require('ws');

class WebSocketServer {
  constructor() {
    this.wss = null;
  }

  attachToServer(server) {
    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', this.handleConnection.bind(this));
  }

  handleConnection(ws) {
    ws.on('message', (message) => this.handleMessage(ws, message));
    ws.on('close', () => this.handleClose(ws));
    ws.on('pong', () => this.handlePong(ws));
  }

  handleMessage(ws, message) {
    // Parse the message and handle game logic
    const data = JSON.parse(message);
    // Delegate to World for processing commands, etc.
    if (this.world) {
      this.world.processCommand(ws, data);
    }
  }

  handleClose(ws) {
    if (ws.player) {
      this.world.removePlayer(ws.player);
    }
  }

  handlePong(ws) {
    if (ws.player) {
      ws.player.connected = true;
    }
  }

  // These methods would be called by World or other components
  broadcastToAll(message) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  sendToClient(client, message) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  }
}

module.exports = WebSocketServer;