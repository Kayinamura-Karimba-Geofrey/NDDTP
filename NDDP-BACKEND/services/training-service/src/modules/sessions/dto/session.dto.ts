import { IsString, IsOptional, IsEnum, IsUUID, IsDateString, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { SessionStatus } from '../../../common/enums';

export class CreateSessionDto {
  @ApiProperty() @IsUUID() courseId: string;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiProperty() @IsDateString() endDate: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() instructorId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class SessionFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() courseId?: string;
  @ApiPropertyOptional({ enum: SessionStatus }) @IsOptional() @IsEnum(SessionStatus) status?: SessionStatus;
}
