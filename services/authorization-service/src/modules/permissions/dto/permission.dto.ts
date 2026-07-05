import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, Matches } from 'class-validator';
import { PermissionStatus } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreatePermissionDto {
  @ApiProperty({ example: 'training:manage:courses' })
  @IsString() @IsNotEmpty() @MaxLength(150)
  @Matches(/^[a-z]+:[a-z]+:[a-z_]+$/, { message: 'Code must follow module:action:resource format' })
  code: string;

  @ApiProperty({ example: 'Manage Training Courses' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  name: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;

  @ApiProperty({ example: 'training' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  module: string;

  @ApiProperty({ example: 'manage' })
  @IsString() @IsNotEmpty() @MaxLength(50)
  action: string;

  @ApiProperty({ example: 'courses' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  resource: string;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiPropertyOptional({ enum: PermissionStatus })
  @IsOptional() @IsEnum(PermissionStatus)
  status?: PermissionStatus;
}

export class PermissionFilterDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  module?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  search?: string;
}

export class PermissionResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() code: string;
  @ApiProperty() name: string;
  @ApiProperty() module: string;
  @ApiProperty() action: string;
  @ApiProperty() resource: string;
  @ApiProperty() isSystem: boolean;
  @ApiProperty() status: string;
}
