import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ItemCategory, UnitOfMeasure } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateItemDto {
  @ApiProperty() @IsString() @IsNotEmpty() sku: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: ItemCategory }) @IsEnum(ItemCategory) category: ItemCategory;
  @ApiPropertyOptional({ enum: UnitOfMeasure }) @IsOptional() @IsEnum(UnitOfMeasure) unit?: UnitOfMeasure;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) reorderLevel?: number;
}

export class ItemFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ItemCategory }) @IsOptional() @IsEnum(ItemCategory) category?: ItemCategory;
}
