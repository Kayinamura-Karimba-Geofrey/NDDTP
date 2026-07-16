import { IsString, IsEnum, IsUUID, IsOptional, MaxLength, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TransportMode } from '../../../common/enums';

export class CreateRouteDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty() @IsUUID() originLocationId: string;
  @ApiProperty() @IsUUID() destinationLocationId: string;
  @ApiProperty({ enum: TransportMode }) @IsEnum(TransportMode) transportMode: TransportMode;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) distanceKm?: number;
  @ApiPropertyOptional() @IsOptional() @IsNumber() @Min(0) estimatedHours?: number;
}
