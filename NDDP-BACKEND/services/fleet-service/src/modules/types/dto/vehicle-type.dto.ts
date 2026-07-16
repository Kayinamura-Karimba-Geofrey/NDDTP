import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { VehicleTypeCategory } from '../../../common/enums';

export class CreateVehicleTypeDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: VehicleTypeCategory }) @IsEnum(VehicleTypeCategory) category: VehicleTypeCategory;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
