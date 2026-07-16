import { IsUUID, IsInt, Min, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { RequestStatus } from '../../../common/enums';

export class CreateRequestDto {
  @ApiProperty() @IsUUID() warehouseId: string;
  @ApiProperty() @IsUUID() itemId: string;
  @ApiProperty() @IsInt() @Min(1) requestedQuantity: number;
  @ApiPropertyOptional() @IsOptional() @IsString() justification?: string;
}

export class ApproveRequestDto {
  @ApiProperty() @IsInt() @Min(1) approvedQuantity: number;
}

export class RejectRequestDto {
  @ApiProperty() @IsString() rejectionReason: string;
}

export class RequestFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: RequestStatus }) @IsOptional() status?: RequestStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() requestedBy?: string;
}
