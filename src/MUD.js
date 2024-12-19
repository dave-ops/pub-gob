'use strict'

const StaticWebServer = require('./StaticWebServer');
const WebSocketServer = require('./WebSocketServer');
const World = require('./World');

class MUD {
    constructor(server, config) {
        // Constructor logic here
        this.server = server;
        this.config = config;
        this.staticServer = new StaticWebServer();
        this.wsServer = new WebSocketServer();
        this.world = new World(config);
    }

    close = () => {
        if (!server) {
            return;
        }
        
        this.server.close(() => {
            process.exit(0);
        });
    }

    listen = async (port) => {
        console.log('creating static server');
        this.server = this.staticServer.createServer();
        console.log('attaching socket server');
        this.wsServer.attachToServer(this.server);
        console.log('initialize the mud!');
        this.world.initialize(this.wsServer);
        return this.server.listen(port, () => {
            console.log(`server started on ${port}`);
            this.wsServer.attachToServer(this.server);
        });
    }
}

module.exports = MUD;