// ./commands/commands.js

'use strict';

class Commands {
    constructor(world) {
        this.world = world;
        this.commands = {};

        // Initialize commands
        this.initCommands();
    }

    initCommands() {
        // Registering commands
        this.registerCommand('look', this.look.bind(this));
        this.registerCommand('move', this.move.bind(this));
        this.registerCommand('say', this.say.bind(this));
        // Add more commands here...
    }

    registerCommand(name, handler) {
        this.commands[name.toLowerCase()] = handler;
    }

    // Execute a command based on player input
    executeCommand(player, command, args) {
        const cmdName = command.toLowerCase();
        if (this.commands[cmdName]) {
            return this.commands[cmdName](player, args);
        } else {
            this.world.msgPlayer(player, { msg: 'Unknown command.', styleClass: 'error' });
            return false;
        }
    }

    // Command implementations

    look(player, args) {
        const room = this.world.getRoomObject(player.area, player.roomid);
        if (room) {
            let message = `You are in ${room.name}.\n${room.description}`;
            if (room.items.length > 0) {
                message += `\nItems here: ${room.items.map(item => item.displayName).join(', ')}.`;
            }
            if (room.monsters.length > 0) {
                message += `\nMobs here: ${room.monsters.map(mob => mob.displayName).join(', ')}.`;
            }
            if (room.playersInRoom.length > 1) {
                const otherPlayers = room.playersInRoom.filter(p => p !== player);
                if (otherPlayers.length) {
                    message += `\nPlayers here: ${otherPlayers.map(p => p.displayName).join(', ')}.`;
                }
            }
            this.world.msgPlayer(player, { msg: message });
        } else {
            this.world.msgPlayer(player, { msg: 'You seem to be in a place that doesn\'t exist!', styleClass: 'error' });
        }
    }

    move(player, args) {
        if (!args || args.length === 0) {
            this.world.msgPlayer(player, { msg: 'Move where?', styleClass: 'error' });
            return;
        }

        const room = this.world.getRoomObject(player.area, player.roomid);
        if (room) {
            const direction = args[0].toLowerCase();
            const exit = room.exits.find(exit => exit.direction.toLowerCase() === direction);

            if (exit) {
                player.moveTo(exit.area, exit.roomid);
                this.look(player); // Automatically look at the new room after moving
            } else {
                this.world.msgPlayer(player, { msg: `There's no exit in that direction.`, styleClass: 'error' });
            }
        } else {
            this.world.msgPlayer(player, { msg: 'You can\'t seem to move from here.', styleClass: 'error' });
        }
    }

    say(player, args) {
        if (!args || args.length === 0) {
            this.world.msgPlayer(player, { msg: 'Say what?', styleClass: 'error' });
            return;
        }

        const message = args.join(' ');
        this.world.msgRoom(this.world.getRoomObject(player.area, player.roomid), {
            msg: `${player.displayName} says, "${message}"`,
            playerName: player.name // To avoid sending the message back to the sender
        });
    }
}

module.exports = Commands;