"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWinstonConfig = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const createWinstonConfig = (serviceName) => ({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike(serviceName, { prettyPrint: true })),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ],
});
exports.createWinstonConfig = createWinstonConfig;
//# sourceMappingURL=winston.config.js.map