import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { CertificateType, CertificateStatus } from '../../../common/enums';

export class CreateCertificateDto {
  @ApiProperty() @IsUUID() userId: string;
  @ApiProperty({ enum: CertificateType }) @IsEnum(CertificateType) type: CertificateType;
  @ApiProperty() @IsString() @IsNotEmpty() description: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() validFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() validUntil?: string;
}

export class IssueCertificateDto {
  @ApiPropertyOptional() @IsOptional() @IsDateString() validFrom?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() validUntil?: string;
}

export class RevokeCertificateDto {
  @ApiProperty() @IsString() @IsNotEmpty() reason: string;
}

export class CertificateFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional({ enum: CertificateType }) @IsOptional() @IsEnum(CertificateType) type?: CertificateType;
  @ApiPropertyOptional({ enum: CertificateStatus }) @IsOptional() @IsEnum(CertificateStatus) status?: CertificateStatus;
}
