import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { HttpMethod } from '../../../common/enums';

export class CreateRouteDto {
  @ApiProperty() @IsUUID() productId: string;
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() path: string;
  @ApiProperty() @IsUrl() upstreamUrl: string;
  @ApiPropertyOptional({ enum: HttpMethod }) @IsOptional() @IsEnum(HttpMethod) httpMethod?: HttpMethod;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
