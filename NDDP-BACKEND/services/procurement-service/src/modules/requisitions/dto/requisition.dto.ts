import { IsString, IsEnum, IsOptional, IsUUID, IsArray, ValidateNested, IsInt, Min, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from '@nddtp/platform-core';
import { RequisitionStatus, ProcurementPriority } from '../../../common/enums';

export class RequisitionItemDto {
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsInt() @Min(1) quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() unit?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) estimatedUnitCost?: number;
  @ApiPropertyOptional() @IsOptional() @IsUUID() inventoryItemId?: string;
}

export class CreateRequisitionDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() departmentId?: string;
  @ApiPropertyOptional({ enum: ProcurementPriority }) @IsOptional() @IsEnum(ProcurementPriority) priority?: ProcurementPriority;
  @ApiPropertyOptional() @IsOptional() @IsString() justification?: string;
  @ApiProperty({ type: [RequisitionItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => RequisitionItemDto) items: RequisitionItemDto[];
}

export class RejectRequisitionDto {
  @ApiProperty() @IsString() rejectionReason: string;
}

export class RequisitionFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: RequisitionStatus }) @IsOptional() @IsEnum(RequisitionStatus) status?: RequisitionStatus;
}
