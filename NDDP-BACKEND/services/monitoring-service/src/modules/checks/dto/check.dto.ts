import { IsUUID, IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { CheckStatus } from '../../../common/enums';

export class CreateCheckDto {
  @ApiProperty() @IsUUID() targetId: string;
}

export class FailCheckDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() statusCode?: number;
}

export class PassCheckDto {
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) responseTimeMs?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() statusCode?: number;
}

export class CheckFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: CheckStatus }) @IsOptional() @IsEnum(CheckStatus) status?: CheckStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() targetId?: string;
}
