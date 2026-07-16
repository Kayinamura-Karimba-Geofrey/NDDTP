import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BackupType, TargetType } from '../../../common/enums';

export class CreatePolicyDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: BackupType }) @IsEnum(BackupType) backupType: BackupType;
  @ApiProperty({ enum: TargetType }) @IsEnum(TargetType) targetType: TargetType;
  @ApiProperty() @IsString() @IsNotEmpty() schedule: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(1) retentionDays?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
