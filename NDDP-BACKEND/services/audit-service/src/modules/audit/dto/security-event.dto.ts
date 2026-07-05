import { IsOptional, IsUUID, IsEnum, IsBoolean, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { SecurityEventType, AuditSeverity } from '../../../common/enums';

export class SearchSecurityEventsDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  userId?: string;

  @ApiPropertyOptional({ enum: SecurityEventType })
  @IsOptional() @IsEnum(SecurityEventType)
  eventType?: SecurityEventType;

  @ApiPropertyOptional({ enum: AuditSeverity })
  @IsOptional() @IsEnum(AuditSeverity)
  severity?: AuditSeverity;

  @ApiPropertyOptional()
  @IsOptional() @Transform(({ value }) => value === 'true' || value === true) @IsBoolean()
  isResolved?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  toDate?: string;
}
