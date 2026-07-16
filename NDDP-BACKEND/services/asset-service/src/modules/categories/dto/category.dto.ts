import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssetType } from '../../../common/enums';

export class CreateCategoryDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: AssetType }) @IsEnum(AssetType) type: AssetType;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
