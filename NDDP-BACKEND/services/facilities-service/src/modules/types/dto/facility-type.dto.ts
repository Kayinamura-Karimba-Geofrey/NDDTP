import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FacilityTypeCategory } from '../../../common/enums';

export class CreateFacilityTypeDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: FacilityTypeCategory }) @IsEnum(FacilityTypeCategory) category: FacilityTypeCategory;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
