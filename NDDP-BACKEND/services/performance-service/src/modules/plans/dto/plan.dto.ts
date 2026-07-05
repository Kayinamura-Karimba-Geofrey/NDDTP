import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { PlanStatus } from '../../../common/enums';

export class CreatePlanDto {
  @ApiProperty() @IsUUID() userId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() reviewId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() objectives: string;
  @ApiPropertyOptional() @IsOptional() @IsString() milestones?: string;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiProperty() @IsDateString() endDate: string;
}

export class PlanFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional({ enum: PlanStatus }) @IsOptional() status?: PlanStatus;
}
