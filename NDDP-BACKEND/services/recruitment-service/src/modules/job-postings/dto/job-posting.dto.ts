import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsArray, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { EmploymentType, JobPostingStatus } from '../../../common/enums';

export class CreateJobPostingDto {
  @ApiProperty() @IsString() @IsNotEmpty() referenceNumber: string;
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() department: string;
  @ApiPropertyOptional({ enum: EmploymentType }) @IsOptional() @IsEnum(EmploymentType) employmentType?: EmploymentType;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiProperty() @IsString() @IsNotEmpty() description: string;
  @ApiPropertyOptional() @IsOptional() @IsArray() requirements?: string[];
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) positionsAvailable?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() closingDate?: string;
}

export class UpdateJobPostingDto {
  @ApiPropertyOptional() @IsOptional() @IsString() title?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() department?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsArray() requirements?: string[];
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) positionsAvailable?: number;
  @ApiPropertyOptional() @IsOptional() @IsDateString() closingDate?: string;
}

export class JobPostingFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: JobPostingStatus }) @IsOptional() @IsEnum(JobPostingStatus) status?: JobPostingStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() department?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() search?: string;
}
