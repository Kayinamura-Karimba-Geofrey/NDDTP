import { IsUUID, IsOptional, IsString, IsArray, ValidateNested, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from '@nddtp/platform-core';
import { WorkOrderStatus } from '../../../common/enums';

export class WorkOrderTaskDto {
  @ApiProperty() @IsString() description: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) estimatedHours?: number;
}

export class CreateWorkOrderDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() requestId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() assignedTo?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() scheduledDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiProperty({ type: [WorkOrderTaskDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => WorkOrderTaskDto) tasks: WorkOrderTaskDto[];
}

export class ScheduleWorkOrderDto {
  @ApiProperty() @IsDateString() scheduledDate: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() assignedTo?: string;
}

export class WorkOrderFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: WorkOrderStatus }) @IsOptional() status?: WorkOrderStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() assignedTo?: string;
}
