import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpMethod } from '../../../common/enums';

export class CreateEndpointDto {
  @ApiProperty() @IsUUID() connectorId: string;
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() path: string;
  @ApiPropertyOptional({ enum: HttpMethod }) @IsOptional() @IsEnum(HttpMethod) httpMethod?: HttpMethod;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() mapping?: Record<string, unknown>;
}
