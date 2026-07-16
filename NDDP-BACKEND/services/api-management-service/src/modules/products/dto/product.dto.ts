import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ApiProtocol } from '../../../common/enums';

export class CreateProductDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiPropertyOptional() @IsOptional() @IsString() version?: string;
  @ApiProperty() @IsString() @IsNotEmpty() basePath: string;
  @ApiPropertyOptional({ enum: ApiProtocol }) @IsOptional() @IsEnum(ApiProtocol) protocol?: ApiProtocol;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
