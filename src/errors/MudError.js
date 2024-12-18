'use strict'

class MudError extends Error {
    constructor(message, data) {
        super(message);
        this.name = "MudError";
        this.data = data;
        console.error(`mud error ${message}`);
        console.error({ data });
    }
}

module.exports = MudError;