import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignAssetDto {
  @ApiProperty() @IsUUID() assetId: string;
  @ApiProperty() @IsUUID() userId: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() unitId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class ReturnAssetDto {
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
