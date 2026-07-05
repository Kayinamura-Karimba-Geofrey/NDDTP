import { IsString, IsEnum, IsOptional, IsUUID, IsInt, Min, Max, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { FuelType, VehicleStatus } from '../../../common/enums';

export class CreateVehicleDto {
  @ApiProperty() @IsString() @MaxLength(30) registrationNumber: string;
  @ApiProperty() @IsUUID() typeId: string;
  @ApiProperty() @IsString() @MaxLength(200) make: string;
  @ApiProperty() @IsString() @MaxLength(200) model: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1900) @Max(2100) modelYear?: number;
  @ApiPropertyOptional({ enum: FuelType }) @IsOptional() @IsEnum(FuelType) fuelType?: FuelType;
  @ApiPropertyOptional() @IsOptional() @IsUUID() unitId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class UpdateVehicleStatusDto {
  @ApiProperty({ enum: VehicleStatus }) @IsEnum(VehicleStatus) status: VehicleStatus;
}

export class VehicleFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: VehicleStatus }) @IsOptional() @IsEnum(VehicleStatus) status?: VehicleStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() typeId?: string;
}
