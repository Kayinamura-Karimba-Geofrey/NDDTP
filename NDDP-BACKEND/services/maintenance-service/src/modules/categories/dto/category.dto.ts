import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MaintenanceType } from '../../../common/enums';

export class CreateCategoryDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: MaintenanceType }) @IsEnum(MaintenanceType) type: MaintenanceType;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
