import { IsUUID, IsEnum, IsString, IsInt, Min, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TripPurpose } from '../../../common/enums';

export class LogTripDto {
  @ApiProperty() @IsUUID() vehicleId: string;
  @ApiProperty() @IsUUID() driverId: string;
  @ApiProperty({ enum: TripPurpose }) @IsEnum(TripPurpose) purpose: TripPurpose;
  @ApiProperty() @IsString() origin: string;
  @ApiProperty() @IsString() destination: string;
  @ApiProperty() @IsInt() @Min(0) startOdometer: number;
  @ApiProperty() @IsInt() @Min(0) endOdometer: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) fuelUsedLiters?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
