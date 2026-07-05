import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IndexType } from '../../../common/enums';

export class CreateSearchIndexDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: IndexType }) @IsEnum(IndexType) indexType: IndexType;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
