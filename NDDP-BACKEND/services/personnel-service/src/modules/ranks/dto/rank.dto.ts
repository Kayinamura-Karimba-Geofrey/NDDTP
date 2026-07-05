import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum, IsUUID, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RankCategory } from '../../../common/enums';

export class CreateRankDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() abbreviation: string;
  @ApiProperty() @IsInt() level: number;
  @ApiProperty({ enum: RankCategory }) @IsEnum(RankCategory) category: RankCategory;
}

export class PromotePersonnelDto {
  @ApiProperty() @IsUUID() rankId: string;
  @ApiProperty() @IsDateString() effectiveDate: string;
  @ApiPropertyOptional() @IsOptional() @IsString() orderNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
