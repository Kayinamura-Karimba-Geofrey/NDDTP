import { IsUUID, IsOptional, IsString, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { JobStatus } from '../../../common/enums';

export class CreateJobDto {
  @ApiProperty() @IsUUID() policyId: string;
}

export class FailJobDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
}

export class CompleteJobDto {
  @ApiPropertyOptional() @IsOptional() @IsString() backupPath?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) sizeBytes?: number;
}

export class JobFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: JobStatus }) @IsOptional() @IsEnum(JobStatus) status?: JobStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() policyId?: string;
}
