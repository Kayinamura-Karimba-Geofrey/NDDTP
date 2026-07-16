import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MfaService } from './mfa.service';
import { MfaController } from './mfa.controller';
import { MfaRepository } from './repositories/mfa.repository';
import { MfaSetting } from '../../database/entities/mfa-setting.entity';
import { MfaBackupCode } from '../../database/entities/mfa-backup-code.entity';
import { PasswordModule } from '../password/password.module';
import { AuthCredentialRepository } from '../credentials/repositories/auth-credential.repository';
import { AuthCredential } from '../../database/entities/auth-credential.entity';
import { EventsModule } from '../../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MfaSetting, MfaBackupCode, AuthCredential]),
    PasswordModule,
    EventsModule,
  ],
  controllers: [MfaController],
  providers: [MfaService, MfaRepository, AuthCredentialRepository],
  exports: [MfaService, MfaRepository],
})
export class MfaModule {}
