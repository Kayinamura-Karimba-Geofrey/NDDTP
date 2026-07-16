import { IsString, IsEnum, IsOptional, IsInt, Min, MaxLength, IsBoolean, ValidateNested, IsArray, ArrayMinSize } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { WorkflowEntityType } from '../../../common/enums';

export class WorkflowStepDto {
  @ApiProperty() @IsInt() @Min(1) stepOrder: number;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty() @IsString() @MaxLength(50) approverRole: string;
  @ApiPropertyOptional() @IsOptional() @IsBoolean() isRequired?: boolean;
}

export class CreateWorkflowDefinitionDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: WorkflowEntityType }) @IsEnum(WorkflowEntityType) entityType: WorkflowEntityType;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiProperty({ type: [WorkflowStepDto] })
  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => WorkflowStepDto)
  steps: WorkflowStepDto[];
}
