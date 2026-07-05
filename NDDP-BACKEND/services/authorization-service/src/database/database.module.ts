import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Role, Permission, RolePermission, UserRoleAssignment, AuthorizationDecisionLog } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [Role, Permission, RolePermission, UserRoleAssignment, AuthorizationDecisionLog],
        synchronize: configService.get<string>('app.nodeEnv') === 'development',
        logging: configService.get<boolean>('database.logging'),
        ssl: configService.get<boolean>('database.ssl') ? { rejectUnauthorized: false } : false,
        extra: { max: configService.get<number>('database.poolSize') },
      }),
    }),
  ],
})
export class DatabaseModule {}
