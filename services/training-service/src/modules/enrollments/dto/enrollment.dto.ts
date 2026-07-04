import { IsString, IsOptional, IsEnum, IsUUID, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { EnrollmentStatus } from '../../../common/enums';

export class CreateEnrollmentDto {
  @ApiProperty() @IsUUID() sessionId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() justification?: string;
}

export class RejectEnrollmentDto {
  @ApiProperty() @IsString() rejectionReason: string;
}

export class CompleteEnrollmentDto {
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) @Max(100) score?: number;
}

export class EnrollmentFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: EnrollmentStatus }) @IsOptional() @IsEnum(EnrollmentStatus) status?: EnrollmentStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() sessionId?: string;
}
