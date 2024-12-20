'use strict'

const { v4: uuidv4 } = require('uuid');
const { Character } = require('./models');

class World {
    constructor(config) {
      this.config = config;
      this.players = {};
      this.rooms = {};
      this.character = new Character(this);
      // Initialize other game elements here
    }
  
    initialize(wsServer) {
      this.wsServer = wsServer;
      // Setup game environment, load rooms, commands, etc.
    }
  
    processCommand(ws, data) {
      // Process game commands, player actions, etc.
      if (!ws.player) {
        this.handleLogin(ws, data);
      } else {
        this.executeCommand(ws, data);
      }
    }
  
    handleLogin(ws, data) {
      // Logic for player login or creation
      if (!ws.player) {
        ws.player = this.createNewPlayer(data);
      } else if (!ws.player.logged) {
        // Handle password verification or further login steps
      }
    }
  
    createNewPlayer(data) {
      // Create player object with initial properties
      console.log('world.createnewplayer');
      return this.character;
    }
  
    executeCommand(ws, data) {
      // Parse command, check validity, execute game logic
      if (data.msg) {
        const command = this.parseCommand(data.msg);
        if (this.isValidCommand(command)) {
          this.executeGameCommand(ws.player, command);
        }
      }
      // Send back response or update game state
    }
  
    removePlayer(player) {
      // Remove player from the game world, clean up resources
      delete this.players[player.id];
    }
  
    // Additional methods for game logic, command validation, etc.
    createRefId = () => uuidv4();
      
  }
  
  module.exports = World;