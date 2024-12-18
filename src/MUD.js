const StaticFileServer = require('./StaticFileServer');
const WebSocketServer = require('./WebSocketServer');
const World = require('./World');

class MUD {
    constructor(server, config, callback) {
        // Constructor logic here
        this.server = server;
        this.config = config;
        this.staticServer = new StaticFileServer();
        this.wsServer = new WebSocketServer();
        this.world = new World(config);
        this.setup(callback);
    }

    setup(callback) {
        const server = this.staticServer.createServer();
        this.wsServer.attachToServer(server);
    
        // initialize the mud!
        this.world.initialize(this.wsServer);

        server.listen(this.port, () => {
            console.log(`Server running on port ${this.config.server.port}`);
            if (callback) callback();
        });
    }
}

module.exports = MUD;