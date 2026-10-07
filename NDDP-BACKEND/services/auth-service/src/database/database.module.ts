import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthCredential,
  UserSession,
  RefreshToken,
  MfaSetting,
  MfaBackupCode,
  LoginAttempt,
  PasswordResetToken,
} from './entities';

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
        entities: [
          AuthCredential,
          UserSession,
          RefreshToken,
          MfaSetting,
          MfaBackupCode,
          LoginAttempt,
          PasswordResetToken,
        ],
        // Schema changes go through migrations only, so dev and prod cannot drift apart.
        synchronize: false,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: process.env.DB_RUN_MIGRATIONS === 'true',
        logging: configService.get<boolean>('database.logging'),
        retryAttempts: 10,
        retryDelay: 5000,
        autoLoadEntities: true,
        ssl:
          configService.get<string>('app.nodeEnv') === 'production' || configService.get<boolean>('database.ssl')
            ? { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false' }
            : false,
        extra: {
          max: configService.get<number>('database.poolSize'),
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
