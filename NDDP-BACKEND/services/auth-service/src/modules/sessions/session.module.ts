import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserSessionRepository } from './repositories/user-session.repository';
import { UserSession } from '../../database/entities/user-session.entity';
import { AuthCredential } from '../../database/entities/auth-credential.entity';
import { AuthCredentialRepository } from '../credentials/repositories/auth-credential.repository';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSession, AuthCredential]),
    EventsModule,
  ],
  controllers: [SessionController],
  providers: [SessionService, UserSessionRepository, AuthCredentialRepository],
  exports: [SessionService, UserSessionRepository],
})
export class SessionModule {}
