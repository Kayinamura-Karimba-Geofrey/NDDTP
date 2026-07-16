import { IsUUID, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkflowEntityType, InstanceStatus } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateInstanceDto {
  @ApiProperty() @IsUUID() definitionId: string;
  @ApiProperty({ enum: WorkflowEntityType }) @IsEnum(WorkflowEntityType) entityType: WorkflowEntityType;
  @ApiProperty() @IsUUID() entityId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class InstanceFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: InstanceStatus }) @IsOptional() @IsEnum(InstanceStatus) status?: InstanceStatus;
  @ApiPropertyOptional({ enum: WorkflowEntityType }) @IsOptional() @IsEnum(WorkflowEntityType) entityType?: WorkflowEntityType;
}
