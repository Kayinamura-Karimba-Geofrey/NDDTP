import { IsUUID, IsOptional, IsObject, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { JobStatus } from '../../../common/enums';

export class CreateJobDto {
  @ApiProperty() @IsUUID() connectorId: string;
  @ApiProperty() @IsUUID() endpointId: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() payload?: Record<string, unknown>;
}

export class FailJobDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
}

export class CompleteJobDto {
  @ApiPropertyOptional() @IsOptional() @IsObject() result?: Record<string, unknown>;
}

export class AppendJobLogDto {
  @ApiProperty() @IsString() message: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() metadata?: Record<string, unknown>;
}

export class JobFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: JobStatus }) @IsOptional() @IsEnum(JobStatus) status?: JobStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() connectorId?: string;
}
