import { IsString, IsEnum, IsOptional, MaxLength, IsObject, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BiReportType } from '../../../common/enums';

export class CreateBiReportDefinitionDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty() @IsUUID() modelId: string;
  @ApiProperty({ enum: BiReportType }) @IsEnum(BiReportType) reportType: BiReportType;
  @ApiPropertyOptional() @IsOptional() @IsObject() layout?: Record<string, unknown>;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class CreateBiReportExecutionDto {
  @ApiProperty() @IsUUID() reportId: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() parameters?: Record<string, unknown>;
}

export class CompleteBiReportExecutionDto {
  @ApiProperty() @IsObject() result: Record<string, unknown>;
}

export class FailBiReportExecutionDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
}
