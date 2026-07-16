import { IsString, IsEnum, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BudgetCategoryType } from '../../../common/enums';

export class CreateBudgetCategoryDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: BudgetCategoryType }) @IsEnum(BudgetCategoryType) categoryType: BudgetCategoryType;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
