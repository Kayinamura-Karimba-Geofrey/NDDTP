import { IsUUID, IsString, IsOptional, IsEnum, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VisitStatus } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateVisitDto {
  @ApiProperty() @IsUUID() visitorId: string;
  @ApiProperty() @IsUUID() siteId: string;
  @ApiProperty() @IsString() @MaxLength(300) purpose: string;
  @ApiProperty() @IsDateString() scheduledAt: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expectedDeparture?: string;
}

export class RejectVisitDto {
  @ApiProperty() @IsString() rejectionReason: string;
}

export class VisitFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: VisitStatus }) @IsOptional() @IsEnum(VisitStatus) status?: VisitStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() visitorId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() siteId?: string;
}
