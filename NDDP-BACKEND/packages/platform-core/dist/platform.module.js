"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PlatformModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const throttler_1 = require("@nestjs/throttler");
const nest_winston_1 = require("nest-winston");
const jwt_auth_guard_1 = require("./auth/jwt-auth.guard");
const permissions_guard_1 = require("./auth/permissions.guard");
const jwt_strategy_1 = require("./auth/jwt.strategy");
const winston_config_1 = require("./config/winston.config");
const global_exception_filter_1 = require("./observability/global-exception.filter");
const correlation_id_interceptor_1 = require("./observability/correlation-id.interceptor");
const platform_health_controller_1 = require("./health/platform-health.controller");
let PlatformModule = PlatformModule_1 = class PlatformModule {
    static forRoot(options) {
        return {
            module: PlatformModule_1,
            global: true,
            imports: [
                config_1.ConfigModule,
                nest_winston_1.WinstonModule.forRoot((0, winston_config_1.createWinstonConfig)(options.serviceName)),
                throttler_1.ThrottlerModule.forRootAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => [{
                            ttl: configService.get('security.rateLimitTtl') || 60,
                            limit: configService.get('security.rateLimitLimit') || 200,
                        }],
                }),
                passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        secret: configService.get('jwt.accessSecret') ||
                            process.env.JWT_ACCESS_SECRET ||
                            'change_me_access_secret_min_32_chars_long',
                    }),
                }),
            ],
            controllers: [platform_health_controller_1.PlatformHealthController],
            providers: [
                core_1.Reflector,
                jwt_strategy_1.JwtStrategy,
                { provide: core_1.APP_FILTER, useClass: global_exception_filter_1.GlobalExceptionFilter },
                { provide: core_1.APP_INTERCEPTOR, useClass: correlation_id_interceptor_1.CorrelationIdInterceptor },
                { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
                { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
                { provide: core_1.APP_GUARD, useClass: permissions_guard_1.PermissionsGuard },
            ],
            exports: [jwt_1.JwtModule, passport_1.PassportModule, core_1.Reflector],
        };
    }
};
exports.PlatformModule = PlatformModule;
exports.PlatformModule = PlatformModule = PlatformModule_1 = __decorate([
    (0, common_1.Module)({})
], PlatformModule);
//# sourceMappingURL=platform.module.js.map