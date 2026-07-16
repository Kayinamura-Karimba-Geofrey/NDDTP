import { IsString, IsEnum, IsOptional, MaxLength, IsArray, ValidateNested, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ModelStatus } from '../../../common/enums';

export class DimensionDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() field: string;
  @ApiProperty() @IsString() type: string;
}

export class MeasureDto {
  @ApiProperty() @IsString() name: string;
  @ApiProperty() @IsString() field: string;
  @ApiProperty() @IsString() aggregation: string;
}

export class CreateSemanticModelDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty() @IsUUID() datasetId: string;
  @ApiPropertyOptional({ type: [DimensionDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => DimensionDto)
  dimensions?: DimensionDto[];
  @ApiPropertyOptional({ type: [MeasureDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => MeasureDto)
  measures?: MeasureDto[];
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class UpdateModelStatusDto {
  @ApiProperty({ enum: ModelStatus }) @IsEnum(ModelStatus) status: ModelStatus;
}
