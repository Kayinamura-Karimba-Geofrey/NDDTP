import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VisitSite, Visitor, VisitRequest, CheckInLog } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => ({
        type: 'postgres' as const,
        host: cs.get<string>('database.host'),
        port: cs.get<number>('database.port'),
        username: cs.get<string>('database.username'),
        password: cs.get<string>('database.password'),
        database: cs.get<string>('database.name'),
        entities: [VisitSite, Visitor, VisitRequest, CheckInLog],
        synchronize: cs.get<string>('app.nodeEnv') === 'development',
        logging: cs.get<boolean>('database.logging'),
        extra: { max: cs.get<number>('database.poolSize') },
      }),
    }),
  ],
})
export class DatabaseModule {}
