import { IsString, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { CertificationStatus } from '../../../common/enums';

export class IssueCertificationDto {
  @ApiProperty() @IsUUID() enrollmentId: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() validUntil?: string;
}

export class RevokeCertificationDto {
  @ApiProperty() @IsString() reason: string;
}

export class CertificationFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional({ enum: CertificationStatus }) @IsOptional() @IsEnum(CertificationStatus) status?: CertificationStatus;
}
