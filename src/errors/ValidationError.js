const { MudError } = require('./MudError');
const { ComparisonError } = require('./ComparisonError');
const JsonHelpers = require('../helpers/jsonHelpers');
const RETURN_CODES = require('../constants/httpReturnCodes');

class ValidationError extends MudError {
    constructor(message) {
        super(message, RETURN_CODES.CLIENT_ERROR.BAD_REQUEST);

        this.name = this.constructor.name;
        this.errors = [];
        this.statusText = 'Validation Error';

        Error.captureStackTrace(this, this.constructor);
    }

    addValidationError(field, error) {
        if (!field) {
            throw new Error('addValidationError is missing field');
        }

        if (!error) {
            throw new Error('addValidationError is missing error');
        }

        this.errors.push({
            field,
            error,
        });
        this.message = this.errors.map((e) => `${e.field}: ${e.error}`).join('<br/>');
    }

    addRequiredError(field) {
        this.addValidationError(field, `${field} is required.`);
    }

    addError(field, error) {
        this.addValidationError(field, error);
    }

    validateRequiredProperty(propertyName, value) {
        if (!value) {
            this.addRequiredError(propertyName);
        }
    }

    validateRequiredObjectProperties(requiredObject, obj) {
        try {
            JsonHelpers.compareProperties(requiredObject, obj);
        } catch (err) {
            if (err instanceof ComparisonError) {
                this.addRequiredError(err.property);
            } else {
                throw err;
            }
        }
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    validate() {
        if (this.errors.length) {
            const msg = this.errors.map((e) => `${e.field}: ${e.error}`).join('\r');
            const error = new ValidationError(msg);
            error.errors = this.errors;
            throw error;
        }
    }

    static validateRequiredProperties(props) {
        const v = new ValidationError();
        Object.keys(props).forEach((prop) => v.validateRequiredProperty(prop, props[prop]));
        v.validate();
    }

    static setRequiredProperties(props) {
        const v = new ValidationError();
        Object.keys(props).forEach((prop) => v.validateRequiredProperty(prop, props[prop]));
        return v;
    }

    static typeCheck(data, T) {
        if (!(data instanceof T)) {
            throw new ValidationError(`Must be instance of ${T.prototype.constructor.name}`);
        }
        return data;
    }
}

module.exports = ValidationError;
module.exports.ValidationError = ValidationError;
