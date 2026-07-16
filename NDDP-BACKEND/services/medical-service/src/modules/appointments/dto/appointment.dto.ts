import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { AppointmentType, AppointmentStatus } from '../../../common/enums';

export class CreateAppointmentDto {
  @ApiProperty() @IsUUID() facilityId: string;
  @ApiProperty({ enum: AppointmentType }) @IsEnum(AppointmentType) type: AppointmentType;
  @ApiProperty() @IsDateString() scheduledAt: string;
  @ApiProperty() @IsString() @IsNotEmpty() reason: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class CancelAppointmentDto {
  @ApiProperty() @IsString() @IsNotEmpty() reason: string;
}

export class AppointmentFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: AppointmentStatus }) @IsOptional() @IsEnum(AppointmentStatus) status?: AppointmentStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() userId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() facilityId?: string;
}
