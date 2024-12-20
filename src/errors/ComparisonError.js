const { MudError } = require('./MudError');

class ComparisonError extends MudError {
    constructor(property, ...params) {
        super(...params);
        this.property = property;
    }
}

module.exports = ComparisonError;
module.exports.ComparisonError = ComparisonError;
