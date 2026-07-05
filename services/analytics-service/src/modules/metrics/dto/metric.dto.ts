import { IsString, IsEnum, IsOptional, MaxLength, IsNumber, IsObject, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MetricDomain, AggregationType } from '../../../common/enums';

export class CreateMetricDefinitionDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: MetricDomain }) @IsEnum(MetricDomain) domain: MetricDomain;
  @ApiProperty({ enum: AggregationType }) @IsEnum(AggregationType) aggregationType: AggregationType;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(50) unit?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class RecordMetricSnapshotDto {
  @ApiProperty() @IsDateString() periodStart: string;
  @ApiProperty() @IsDateString() periodEnd: string;
  @ApiProperty() @IsNumber() value: number;
  @ApiPropertyOptional() @IsOptional() @IsObject() dimensions?: Record<string, unknown>;
}

export class SnapshotFilterDto {
  @ApiPropertyOptional() @IsOptional() @IsDateString() from?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() to?: string;
}
