import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SiteType } from '../../../common/enums';

export class CreateVisitSiteDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: SiteType }) @IsEnum(SiteType) siteType: SiteType;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(300) location?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
