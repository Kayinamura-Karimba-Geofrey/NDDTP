import { IsOptional, IsString, IsUUID, IsEnum, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { AuditAction, AuditOutcome, AuditSeverity } from '../../../common/enums';

export class SearchAuditLogsDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  eventType?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: AuditAction })
  @IsOptional() @IsEnum(AuditAction)
  action?: AuditAction;

  @ApiPropertyOptional({ enum: AuditOutcome })
  @IsOptional() @IsEnum(AuditOutcome)
  outcome?: AuditOutcome;

  @ApiPropertyOptional({ enum: AuditSeverity })
  @IsOptional() @IsEnum(AuditSeverity)
  severity?: AuditSeverity;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  resourceType?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  resourceId?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  correlationId?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  toDate?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  search?: string;
}

export class CreateAuditLogDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  eventType: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  source: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  category: string;

  @ApiPropertyOptional({ enum: AuditAction })
  @IsOptional() @IsEnum(AuditAction)
  action: AuditAction;

  @ApiPropertyOptional({ enum: AuditOutcome })
  @IsOptional() @IsEnum(AuditOutcome)
  outcome: AuditOutcome;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID()
  userId?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;
}
