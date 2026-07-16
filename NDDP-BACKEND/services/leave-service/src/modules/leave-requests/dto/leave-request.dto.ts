import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { LeaveRequestStatus } from '../../../common/enums';

export class CreateLeaveRequestDto {
  @ApiProperty() @IsUUID() leaveTypeId: string;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiProperty() @IsDateString() endDate: string;
  @ApiPropertyOptional() @IsOptional() @IsString() reason?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() approverId?: string;
}

export class ApproveLeaveDto {
  @ApiPropertyOptional() @IsOptional() @IsString() comments?: string;
}

export class RejectLeaveDto {
  @ApiProperty() @IsString() @IsNotEmpty() rejectionReason: string;
  @ApiPropertyOptional() @IsOptional() @IsString() comments?: string;
}

export class LeaveRequestFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: LeaveRequestStatus }) @IsOptional() @IsEnum(LeaveRequestStatus) status?: LeaveRequestStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
}
