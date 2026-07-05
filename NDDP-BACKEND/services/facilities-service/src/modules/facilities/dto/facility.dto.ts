import { IsString, IsUUID, IsOptional, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { FacilityStatus } from '../../../common/enums';

export class CreateFacilityDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty() @IsUUID() typeId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(300) location?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class FacilityFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: FacilityStatus }) @IsOptional() status?: FacilityStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() typeId?: string;
}
