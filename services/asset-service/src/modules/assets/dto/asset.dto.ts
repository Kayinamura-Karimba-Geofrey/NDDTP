import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsNumber, IsDateString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { AssetStatus } from '../../../common/enums';

export class CreateAssetDto {
  @ApiProperty() @IsUUID() categoryId: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() serialNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() unitId?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() acquisitionDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) value?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class TransferAssetDto {
  @ApiProperty() @IsUUID() toUnitId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class DisposeAssetDto {
  @ApiProperty() @IsString() @IsNotEmpty() reason: string;
}

export class AssetFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: AssetStatus }) @IsOptional() @IsEnum(AssetStatus) status?: AssetStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() categoryId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() unitId?: string;
}
