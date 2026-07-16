import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TargetType } from '../../../common/enums';

export class CreateTargetDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: TargetType }) @IsEnum(TargetType) targetType: TargetType;
  @ApiProperty() @IsString() @IsNotEmpty() endpointUrl: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(10) checkIntervalSeconds?: number;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
