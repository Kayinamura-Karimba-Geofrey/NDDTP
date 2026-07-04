import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordResetTokenRepository } from './repositories/password-reset-token.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from '../../database/entities/password-reset-token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetToken])],
  providers: [PasswordService, PasswordResetTokenRepository],
  exports: [PasswordService, PasswordResetTokenRepository],
})
export class PasswordModule {}
