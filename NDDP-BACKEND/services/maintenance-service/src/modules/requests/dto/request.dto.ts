import { IsUUID, IsEnum, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { AssetReferenceType, MaintenancePriority, RequestStatus } from '../../../common/enums';

export class CreateRequestDto {
  @ApiProperty() @IsUUID() categoryId: string;
  @ApiProperty({ enum: AssetReferenceType }) @IsEnum(AssetReferenceType) assetType: AssetReferenceType;
  @ApiProperty() @IsUUID() assetId: string;
  @ApiPropertyOptional({ enum: MaintenancePriority }) @IsOptional() @IsEnum(MaintenancePriority) priority?: MaintenancePriority;
  @ApiProperty() @IsString() description: string;
}

export class RejectRequestDto {
  @ApiProperty() @IsString() rejectionReason: string;
}

export class RequestFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: RequestStatus }) @IsOptional() @IsEnum(RequestStatus) status?: RequestStatus;
  @ApiPropertyOptional({ enum: AssetReferenceType }) @IsOptional() @IsEnum(AssetReferenceType) assetType?: AssetReferenceType;
}
