import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AccountStatus } from '../../../common/enums';

export class TokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  tokenType: string;

  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  sessionId: string;
}

export class MfaRequiredResponseDto {
  @ApiProperty()
  mfaRequired: boolean;

  @ApiProperty()
  mfaToken: string;
}

export class UserProfileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: AccountStatus })
  status: AccountStatus;

  @ApiProperty()
  emailVerified: boolean;

  @ApiPropertyOptional()
  lastLoginAt: Date | null;

  @ApiProperty()
  mfaEnabled: boolean;
}

export class MfaSetupResponseDto {
  @ApiProperty()
  secret: string;

  @ApiProperty()
  qrCodeUrl: string;

  @ApiProperty({ type: [String] })
  backupCodes: string[];
}

export class SessionResponseDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  deviceName: string | null;

  @ApiPropertyOptional()
  platform: string | null;

  @ApiPropertyOptional()
  ipAddress: string | null;

  @ApiProperty()
  status: string;

  @ApiProperty()
  mfaVerified: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  lastActivityAt: Date | null;

  @ApiProperty()
  isCurrent: boolean;
}

export class MessageResponseDto {
  @ApiProperty()
  message: string;
}

export class LoginAttemptResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  result: string;

  @ApiPropertyOptional()
  ipAddress: string | null;

  @ApiProperty()
  createdAt: Date;
}
