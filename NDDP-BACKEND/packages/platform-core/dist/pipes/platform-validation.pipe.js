"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlatformValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const createPlatformValidationPipe = () => new common_1.ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
});
exports.createPlatformValidationPipe = createPlatformValidationPipe;
//# sourceMappingURL=platform-validation.pipe.js.map