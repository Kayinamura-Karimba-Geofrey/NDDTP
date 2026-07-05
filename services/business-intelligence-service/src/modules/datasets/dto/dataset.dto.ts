import { IsString, IsEnum, IsOptional, MaxLength, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DataSourceType } from '../../../common/enums';

export class CreateBiDatasetDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: DataSourceType }) @IsEnum(DataSourceType) sourceType: DataSourceType;
  @ApiPropertyOptional() @IsOptional() @IsObject() schema?: Record<string, unknown>;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
