import { IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, IsInt, IsDateString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InterviewType } from '../../../common/enums';

export class ScheduleInterviewDto {
  @ApiProperty({ enum: InterviewType }) @IsEnum(InterviewType) type: InterviewType;
  @ApiProperty() @IsDateString() scheduledAt: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(15) @Max(480) durationMinutes?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsArray() interviewerIds?: string[];
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class CompleteInterviewDto {
  @ApiProperty() @IsString() @IsNotEmpty() feedback: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) @Max(5) rating?: number;
}
