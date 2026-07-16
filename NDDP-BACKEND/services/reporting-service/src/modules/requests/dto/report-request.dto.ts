import { IsUUID, IsOptional, IsEnum, IsObject, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RequestStatus } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateReportRequestDto {
  @ApiProperty() @IsUUID() definitionId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() scheduleId?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() parameters?: Record<string, unknown>;
}

export class FailReportRequestDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
}

export class CompleteReportRequestDto {
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) recordCount?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() filePath?: string;
}

export class RequestFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: RequestStatus }) @IsOptional() @IsEnum(RequestStatus) status?: RequestStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() definitionId?: string;
}
