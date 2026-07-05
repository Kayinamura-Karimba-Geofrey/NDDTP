"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenAccessException = exports.BusinessRuleViolationException = exports.InvalidStatusTransitionException = exports.DuplicateResourceException = exports.ResourceNotFoundException = void 0;
const common_1 = require("@nestjs/common");
class ResourceNotFoundException extends common_1.HttpException {
    constructor(resource, id) {
        super({ statusCode: common_1.HttpStatus.NOT_FOUND, message: `${resource} '${id}' not found`, error: 'Not Found' }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.ResourceNotFoundException = ResourceNotFoundException;
class DuplicateResourceException extends common_1.HttpException {
    constructor(field, value) {
        super({ statusCode: common_1.HttpStatus.CONFLICT, message: `${field} '${value}' already exists`, error: 'Conflict' }, common_1.HttpStatus.CONFLICT);
    }
}
exports.DuplicateResourceException = DuplicateResourceException;
class InvalidStatusTransitionException extends common_1.HttpException {
    constructor(from, to, entity = 'resource') {
        super({ statusCode: common_1.HttpStatus.BAD_REQUEST, message: `Cannot transition ${entity} from ${from} to ${to}`, error: 'Bad Request' }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.InvalidStatusTransitionException = InvalidStatusTransitionException;
class BusinessRuleViolationException extends common_1.HttpException {
    constructor(message) {
        super({ statusCode: common_1.HttpStatus.BAD_REQUEST, message, error: 'Bad Request' }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.BusinessRuleViolationException = BusinessRuleViolationException;
class ForbiddenAccessException extends common_1.HttpException {
    constructor(message = 'Access denied') {
        super({ statusCode: common_1.HttpStatus.FORBIDDEN, message, error: 'Forbidden' }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.ForbiddenAccessException = ForbiddenAccessException;
//# sourceMappingURL=domain.exceptions.js.map