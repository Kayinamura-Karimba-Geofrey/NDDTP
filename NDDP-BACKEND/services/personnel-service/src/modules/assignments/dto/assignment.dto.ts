import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AssignmentType } from '../../../common/enums';

export class CreateAssignmentDto {
  @ApiProperty() @IsUUID() unitId: string;
  @ApiProperty() @IsString() @IsNotEmpty() positionTitle: string;
  @ApiPropertyOptional({ enum: AssignmentType }) @IsOptional() @IsEnum(AssignmentType) assignmentType?: AssignmentType;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiPropertyOptional() @IsOptional() @IsString() orderNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}

export class EndAssignmentDto {
  @ApiProperty() @IsDateString() endDate: string;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
