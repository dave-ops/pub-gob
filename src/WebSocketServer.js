'use strict';

const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const Message = require('./models/Message.js');
const { MudError } = require('./errors');

const PLAYER_PATH = './players';

const AuthFlow = {
    None: { id: 0, value: 0, connected: false, getPrompt: () => 'Fare thee well!' },
    Connected: { id: 1, value: 1, connected: true, getPrompt: () => 'Enter character name:' },
    CharacterCreation: { id: 2, value: 2, connected: true, getPrompt: (charName) => `Welcome ${charName}, select race:` },
    Login: { id: 3, value: 3, connected: true, getPrompt: () => 'Enter password:' },
    InGame: { id: 4, value: 4, connected: true, getPrompt: () => '' },
};

class WebSocketServer {
    constructor(world) {
        this.world = world;
        this.wss = null;
        this.auth_state = AuthFlow.None;
    }

    attachToServer(server) {
        console.log('attach to server');
        if (this.wss) {
            console.log('server already attached');
            return;
        }
        console.log({
            server,
        });

        this.wss = new WebSocket.Server({ server });
        this.wss.on('connection', this.handleConnection.bind(this));
    }

    handleConnection(ws, req) {
        console.log('incoming connection');
        const ip = req.socket.remoteAddress;
        console.log('New connection from', ip);

        if (!this.auth_state.connected) {
            this.auth_state = AuthFlow.Connected;
        }

        ws.on('message', async (message) => {
            console.log('on message');
            this.handleMessage(ws, message);
        });

        ws.on('close', () => {
            console.log('on close');
            return this.handleClose(ws);
        });

        ws.on('pong', () => {
            console.log('on pong');
            return this.handlePong(ws);
        });
    }

    handleLogin = async (ws, name) => {
        try {
            const playerFilePath = path.join(PLAYER_PATH, `${name}.json`);
            const playerExists = await fs
                .access(playerFilePath)
                .then(() => true)
                .catch(() => false);

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
    };

    // handleMessage = async (ws, message) => {
    //     console.log(`handle message ${message}`);
    //     const cmd_msg = `${message}`.trim().toLowerCase();

    //     const character_name = this.auth_state.id === AuthFlow.Connected.id ? cmd_msg : null;
    //     const exists = await characterExists(character_name);
    //     if (!exists) {
    //         console.log('character does not exist, create it');
    //     }

    //     //const result = await this.handleLogin(ws, this.auth_state.message);

    //     // Parse the message and handle game logic
    //     // Delegate to World for processing commands, etc.
    //     if (this.world) {
    //         this.world.processCommand(ws, cmd);
    //     }
    // };

    handleMessage = async (ws, message) => {
        console.log(`handle message ${message}`);
        const cmd_msg = `${message}`.trim().toLowerCase();

        // Determine the current state and act accordingly
        switch (this.auth_state.id) {
            case AuthFlow.Connected.id:
                await this.handleConnectedState(ws, cmd_msg);
                break;
            case AuthFlow.CharacterCreation.id:
                // Handle character creation logic if needed
                break;
            case AuthFlow.Login.id:
                // Handle login logic if needed
                break;
            case AuthFlow.InGame.id:
                // Handle in-game commands
                if (this.world) {
                    this.world.processCommand(ws, cmd_msg);
                }
                break;
            default:
                ws.send('invalid state.');
        }
    };

    handleConnectedState = async (ws, cmd_msg) => {
        const characterExists = await this.checkCharacterExists(cmd_msg);
        if (!characterExists) {
            console.log("character doesn't exist, proceed with character creation.");
            this.world.createNewPlayer();
            ws.send(JSON.stringify({ type: 'info', message: 'Select Race: ' }));
        } else {
            // If the character exists, proceed with login or directly into the game if no password is required
            // Assuming you might have a method to handle login or transition to in-game state
            await this.handleExistingCharacterLogin(ws, cmd_msg);
        }
    };

    checkCharacterExists = async (character_name) => {
        const playerFilePath = path.join(PLAYER_PATH, `${character_name}.json`);
        try {
            await fs.access(playerFilePath);
            return true;
        } catch (error) {
            return false;
        }
    };

    handleExistingCharacterLogin = async (ws, name) => {
        // Here you would handle the login process if necessary
        // For simplicity, let's assume login isn't required for now and transition directly to in-game
        this.auth_state = AuthFlow.InGame;
        ws.send(Message.create(message).toJson());
    };

    handleClose(ws) {
        console.log('handle close');
        if (ws.player) {
            this.world.removePlayer(ws.player);
        }
    }

    handlePong(ws) {
        console.log('pong');
        if (ws.player) {
            ws.player.connected = true;
        }
    }

    // These methods would be called by World or other components
    broadcastToAll(message) {
        console.log('broadcast to all');
        this.wss.clients.forEach((client) => {
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
