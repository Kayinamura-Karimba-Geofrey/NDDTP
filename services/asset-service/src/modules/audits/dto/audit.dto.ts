import { IsUUID, IsDateString, IsOptional, IsString, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateAuditDto {
  @ApiProperty() @IsUUID() unitId: string;
  @ApiProperty() @IsDateString() auditDate: string;
}

export class CompleteAuditDto {
  @ApiPropertyOptional({ type: 'array' }) @IsOptional() @IsArray() findings?: Record<string, unknown>[];
  @ApiPropertyOptional() @IsOptional() @IsString() summary?: string;
}

export class AuditFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() unitId?: string;
}
