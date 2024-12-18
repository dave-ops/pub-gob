// ./Message.js

'use strict';

class Message {
    constructor({ data = {} }) {
        this.data = JSON.parse(data);
    }

    toJson = () => JSON.parse(this);

    static parse = (json) => Object.assign(new Message({ data: json }), json);

}

module.exports = Message
