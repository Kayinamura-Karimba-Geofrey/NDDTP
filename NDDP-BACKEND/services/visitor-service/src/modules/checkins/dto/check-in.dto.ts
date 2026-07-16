import { IsUUID, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CheckInType } from '../../../common/enums';

export class RecordCheckInDto {
  @ApiProperty() @IsUUID() visitId: string;
  @ApiProperty({ enum: CheckInType }) @IsEnum(CheckInType) checkType: CheckInType;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
}
