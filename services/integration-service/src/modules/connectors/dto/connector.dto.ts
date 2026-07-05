import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUrl, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ConnectorType } from '../../../common/enums';

export class CreateConnectorDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: ConnectorType }) @IsEnum(ConnectorType) connectorType: ConnectorType;
  @ApiProperty() @IsUrl() baseUrl: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsObject() config?: Record<string, unknown>;
}
