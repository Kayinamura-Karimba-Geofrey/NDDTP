import { IsUUID, IsEnum, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InspectionResult } from '../../../common/enums';

export class ScheduleInspectionDto {
  @ApiProperty() @IsUUID() vehicleId: string;
  @ApiProperty() @IsDateString() scheduledDate: string;
}

export class CompleteInspectionDto {
  @ApiProperty({ enum: InspectionResult }) @IsEnum(InspectionResult) result: InspectionResult;
  @ApiPropertyOptional() @IsOptional() @IsString() findings?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() recommendations?: string;
}
