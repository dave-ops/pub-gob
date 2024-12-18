const WebSocket = require('ws');

class WebSocketServer {
  constructor() {
    this.wss = null;
  }

  attachToServer(server) {
    console.log('attach to server');
    if (this.wss) {
      console.log('server already attached')
      return;
    }
    this.wss = new WebSocket.Server({ server });
    this.wss.on('connection', () => {
      console.log('on connection');
    });
  }

  handleConnection(ws) {
    console.log('incoming connection');
    console.log({ ws })
    ws.on('message', (message) => {
      console.log('on message');
      return this.handleMessage(ws, message);
    });
    ws.on('close', () => {
      console.log('on close');
      return this.handleClose(ws)
    });
    ws.on('pong', () => {
      console.log('on pong');
      return this.handlePong(ws);
    });
    ws.on('error', (a, b, c) => {
      console.error('on error');
      console.log({a, b, c});
      return this.handlePong(ws);
    });
  }

  handleMessage(ws, message) {
    console.log('handle message');
    // Parse the message and handle game logic
    const data = JSON.parse(message);
    // Delegate to World for processing commands, etc.
    if (this.world) {
      this.world.processCommand(ws, data);
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