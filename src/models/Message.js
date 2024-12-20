// ./Message.js

'use strict';

class Message {
    constructor(message) {
        this.m = message;
    }

    static create = (message) => new Message(message);

    toJson = () => JSON.parse(this);

    static parse = (json) => new Message(json.m);
}

module.exports = Message
