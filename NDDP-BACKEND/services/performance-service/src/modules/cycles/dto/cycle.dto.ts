import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CycleType, CycleStatus } from '../../../common/enums';

export class CreateCycleDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: CycleType }) @IsEnum(CycleType) type: CycleType;
  @ApiProperty() @IsDateString() startDate: string;
  @ApiProperty() @IsDateString() endDate: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class UpdateCycleDto {
  @ApiPropertyOptional() @IsOptional() @IsString() name?: string;
  @ApiPropertyOptional({ enum: CycleStatus }) @IsOptional() @IsEnum(CycleStatus) status?: CycleStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
