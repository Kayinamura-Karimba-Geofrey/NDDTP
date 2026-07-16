import { IsString, IsUUID, IsOptional, IsEnum, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SpaceType, SpaceStatus } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateFacilitySpaceDto {
  @ApiProperty() @IsUUID() facilityId: string;
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: SpaceType }) @IsEnum(SpaceType) spaceType: SpaceType;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) capacity?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100) floor?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class SpaceFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsUUID() facilityId?: string;
  @ApiPropertyOptional({ enum: SpaceStatus }) @IsOptional() @IsEnum(SpaceStatus) status?: SpaceStatus;
}
