import { IsUUID, IsInt, IsOptional, IsNumber, Min, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { BudgetStatus } from '../../../common/enums';

export class CreateBudgetDto {
  @ApiProperty() @IsUUID() accountId: string;
  @ApiProperty() @IsInt() @Min(2000) fiscalYear: number;
  @ApiProperty() @IsNumber() @Min(0) allocatedAmount: number;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class BudgetFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: BudgetStatus }) @IsOptional() @IsEnum(BudgetStatus) status?: BudgetStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() accountId?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() fiscalYear?: number;
}
