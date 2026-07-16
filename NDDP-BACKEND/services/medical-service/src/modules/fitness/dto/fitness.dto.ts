import { IsString, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { FitnessClassification } from '../../../common/enums';

export class CreateFitnessDto {
  @ApiProperty() @IsUUID() userId: string;
  @ApiProperty({ enum: FitnessClassification }) @IsEnum(FitnessClassification) classification: FitnessClassification;
  @ApiProperty() @IsDateString() validFrom: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() validUntil?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() restrictions?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class RevokeFitnessDto {
  @ApiProperty() @IsString() reason: string;
}

export class FitnessFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
}
