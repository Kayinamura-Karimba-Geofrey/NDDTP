import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UnitType } from '../../../common/enums';

export class CreateUnitDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: UnitType }) @IsEnum(UnitType) unitType: UnitType;
  @ApiPropertyOptional() @IsOptional() @IsUUID() parentUnitId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
}

export class UpdateUnitDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() commanderPersonnelId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() isActive?: boolean;
}
