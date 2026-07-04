import { IsString, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TrackingEventType } from '../../../common/enums';

export class RecordTrackingDto {
  @ApiProperty({ enum: TrackingEventType }) @IsEnum(TrackingEventType) eventType: TrackingEventType;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class DelayShipmentDto {
  @ApiProperty() @IsString() reason: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
}
