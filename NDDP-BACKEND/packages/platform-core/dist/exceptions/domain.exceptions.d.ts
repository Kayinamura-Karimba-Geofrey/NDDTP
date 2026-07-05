import { HttpException } from '@nestjs/common';
export declare class ResourceNotFoundException extends HttpException {
    constructor(resource: string, id: string);
}
export declare class DuplicateResourceException extends HttpException {
    constructor(field: string, value: string);
}
export declare class InvalidStatusTransitionException extends HttpException {
    constructor(from: string, to: string, entity?: string);
}
export declare class BusinessRuleViolationException extends HttpException {
    constructor(message: string);
}
export declare class ForbiddenAccessException extends HttpException {
    constructor(message?: string);
}
