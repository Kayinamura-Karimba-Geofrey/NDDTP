import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignVehicleDto {
  @ApiProperty() @IsUUID() vehicleId: string;
  @ApiProperty() @IsUUID() driverId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class ReturnVehicleDto {
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
