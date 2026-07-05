import { IsString, IsEnum, IsOptional, MaxLength, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EntryValueType, EnvironmentScope } from '../../../common/enums';

export class CreateConfigEntryDto {
  @ApiProperty() @IsUUID() namespaceId: string;
  @ApiProperty() @IsString() @MaxLength(200) key: string;
  @ApiProperty() @IsString() value: string;
  @ApiPropertyOptional({ enum: EntryValueType }) @IsOptional() @IsEnum(EntryValueType) valueType?: EntryValueType;
  @ApiPropertyOptional({ enum: EnvironmentScope }) @IsOptional() @IsEnum(EnvironmentScope) environment?: EnvironmentScope;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}

export class UpdateConfigEntryDto {
  @ApiProperty() @IsString() value: string;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
}
