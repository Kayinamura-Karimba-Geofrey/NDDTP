"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventPublisher = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const amqp = require("amqplib");
const uuid_1 = require("uuid");
let BaseEventPublisher = class BaseEventPublisher {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(this.constructor.name);
        this.connection = null;
        this.channel = null;
    }
    async onModuleInit() {
        try {
            this.connection = await amqp.connect(this.configService.get('rabbitmq.url'));
            this.channel = await this.connection.createChannel();
            await this.channel.assertExchange(this.configService.get('rabbitmq.exchange'), 'topic', { durable: true });
            this.logger.log('RabbitMQ connected');
        }
        catch (error) {
            this.logger.error(`RabbitMQ connection failed: ${error.message}`);
        }
    }
    async onModuleDestroy() {
        if (this.channel)
            await this.channel.close();
        if (this.connection)
            await this.connection.close();
    }
    async publish(routingKey, data, correlationId) {
        if (!this.channel)
            return;
        const payload = {
            eventId: (0, uuid_1.v4)(),
            eventType: routingKey,
            timestamp: new Date().toISOString(),
            correlationId: correlationId || (0, uuid_1.v4)(),
            source: this.getSourceName(),
            version: '1.0',
            data,
        };
        this.channel.publish(this.configService.get('rabbitmq.exchange'), routingKey, Buffer.from(JSON.stringify(payload)), { persistent: true, contentType: 'application/json' });
    }
};
exports.BaseEventPublisher = BaseEventPublisher;
exports.BaseEventPublisher = BaseEventPublisher = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BaseEventPublisher);
//# sourceMappingURL=base-event.publisher.js.map