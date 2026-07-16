import { IsUUID, IsOptional, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { RestoreStatus } from '../../../common/enums';

export class CreateRestoreDto {
  @ApiProperty() @IsUUID() jobId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() targetPath?: string;
}

export class FailRestoreDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
}

export class CompleteRestoreDto {
  @ApiPropertyOptional() @IsOptional() @IsString() targetPath?: string;
}

export class RestoreFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: RestoreStatus }) @IsOptional() @IsEnum(RestoreStatus) status?: RestoreStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() jobId?: string;
}
