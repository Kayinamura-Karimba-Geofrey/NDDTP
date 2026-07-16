import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReportType, ReportCategory, OutputFormat } from '../../../common/enums';

export class CreateReportDefinitionDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: ReportType }) @IsEnum(ReportType) reportType: ReportType;
  @ApiProperty({ enum: ReportCategory }) @IsEnum(ReportCategory) category: ReportCategory;
  @ApiPropertyOptional({ enum: OutputFormat }) @IsOptional() @IsEnum(OutputFormat) outputFormat?: OutputFormat;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
