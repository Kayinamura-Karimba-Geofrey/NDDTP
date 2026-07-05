import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FacilityType, FacilityStatus } from '../../../common/enums';

export class CreateFacilityDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: FacilityType }) @IsEnum(FacilityType) type: FacilityType;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
}

export class UpdateFacilityDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional({ enum: FacilityType }) @IsOptional() @IsEnum(FacilityType) type?: FacilityType;
  @ApiPropertyOptional() @IsOptional() @IsString() location?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional({ enum: FacilityStatus }) @IsOptional() @IsEnum(FacilityStatus) status?: FacilityStatus;
}
