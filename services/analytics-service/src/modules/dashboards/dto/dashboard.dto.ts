import { IsString, IsEnum, IsOptional, MaxLength, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ChartType, DashboardStatus } from '../../../common/enums';

export class DashboardWidgetDto {
  @ApiProperty() @IsString() metricId: string;
  @ApiProperty() @IsString() @MaxLength(200) title: string;
  @ApiProperty({ enum: ChartType }) @IsEnum(ChartType) chartType: ChartType;
  @ApiProperty() position: { row: number; col: number; width: number; height: number };
}

export class CreateDashboardDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional({ type: [DashboardWidgetDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => DashboardWidgetDto)
  widgets?: DashboardWidgetDto[];
}

export class UpdateDashboardStatusDto {
  @ApiProperty({ enum: DashboardStatus }) @IsEnum(DashboardStatus) status: DashboardStatus;
}
