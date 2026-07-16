import { IsUUID, IsEnum, IsOptional, IsString, IsArray, ValidateNested, IsInt, Min, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PaginationDto } from '@nddtp/platform-core';
import { TransportMode, ShipmentPriority, ShipmentStatus } from '../../../common/enums';

export class ShipmentItemDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() inventoryItemId?: string;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsInt() @Min(1) quantity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() unit?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) weightKg?: number;
}

export class CreateShipmentDto {
  @ApiProperty() @IsUUID() originLocationId: string;
  @ApiProperty() @IsUUID() destinationLocationId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() routeId?: string;
  @ApiProperty({ enum: TransportMode }) @IsEnum(TransportMode) transportMode: TransportMode;
  @ApiPropertyOptional({ enum: ShipmentPriority }) @IsOptional() @IsEnum(ShipmentPriority) priority?: ShipmentPriority;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiProperty({ type: [ShipmentItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => ShipmentItemDto) items: ShipmentItemDto[];
}

export class ScheduleShipmentDto {
  @ApiProperty() @IsDateString() scheduledDate: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() driverId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() vehicleId?: string;
}

export class ShipmentFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ShipmentStatus }) @IsOptional() @IsEnum(ShipmentStatus) status?: ShipmentStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() originLocationId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() destinationLocationId?: string;
}
