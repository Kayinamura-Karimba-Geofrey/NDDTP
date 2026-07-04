import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseCategory, CourseStatus } from '../../../common/enums';

export class CreateCourseDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: CourseCategory }) @IsEnum(CourseCategory) category: CourseCategory;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) durationDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) maxParticipants?: number;
}

export class UpdateCourseDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional({ enum: CourseCategory }) @IsOptional() @IsEnum(CourseCategory) category?: CourseCategory;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) durationDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) maxParticipants?: number;
  @ApiPropertyOptional({ enum: CourseStatus }) @IsOptional() @IsEnum(CourseStatus) status?: CourseStatus;
}
