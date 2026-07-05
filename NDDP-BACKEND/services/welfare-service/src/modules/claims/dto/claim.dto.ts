import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { ClaimStatus } from '../../../common/enums';

export class CreateClaimDto {
  @ApiProperty() @IsUUID() programId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() dependentId?: string;
  @ApiProperty() @IsNumber() @Min(0) requestedAmount: number;
  @ApiProperty() @IsString() @IsNotEmpty() justification: string;
}

export class ApproveClaimDto {
  @ApiProperty() @IsNumber() @Min(0) approvedAmount: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class RejectClaimDto {
  @ApiProperty() @IsString() @IsNotEmpty() rejectionReason: string;
}

export class DisburseClaimDto {
  @ApiPropertyOptional() @IsOptional() @IsString() paymentReference?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class ClaimFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ClaimStatus }) @IsOptional() @IsEnum(ClaimStatus) status?: ClaimStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() programId?: string;
}
