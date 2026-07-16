import { IsString, IsUUID, IsOptional, IsEnum, IsInt, Min, MaxLength, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateBookingDto {
  @ApiProperty() @IsUUID() spaceId: string;
  @ApiProperty() @IsString() @MaxLength(300) purpose: string;
  @ApiProperty() @IsDateString() startTime: string;
  @ApiProperty() @IsDateString() endTime: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) attendees?: number;
}

export class RejectBookingDto {
  @ApiProperty() @IsString() rejectionReason: string;
}

export class BookingFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: BookingStatus }) @IsOptional() @IsEnum(BookingStatus) status?: BookingStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() spaceId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() bookedBy?: string;
}
