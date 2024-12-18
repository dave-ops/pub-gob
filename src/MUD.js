const StaticWebServer = require('./StaticWebServer');
const WebSocketServer = require('./WebSocketServer');
const World = require('./World');

class MUD {
    constructor(server, config, callback) {
        // Constructor logic here
        this.server = server;
        this.config = config;
        this.staticServer = new StaticWebServer();
        this.wsServer = new WebSocketServer();
        this.world = new World(config);
    }

    listen = async (port) => {
        const server = this.staticServer.createServer();
        this.wsServer.attachToServer(server);
    
        // initialize the mud!
        this.world.initialize(this.wsServer);
        return server.listen(port, () => {
            console.log(`server started on ${port}`);
            this.wsServer.attachToServer(server);
        });
    }
}

module.exports = MUD;