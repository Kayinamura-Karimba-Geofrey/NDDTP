import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateGoalDto {
  @ApiProperty() @IsUUID() cycleId: string;
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() targetDate?: string;
}

export class UpdateGoalProgressDto {
  @ApiProperty() @IsInt() @Min(0) @Max(100) progressPercent: number;
}

export class GoalFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() cycleId?: string;
}
