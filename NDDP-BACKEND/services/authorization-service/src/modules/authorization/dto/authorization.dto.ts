import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsArray } from 'class-validator';
import { ScopeType } from '../../../common/enums';

export class CheckPermissionDto {
  @ApiProperty({ example: 'personnel:read:profile' })
  @IsString() @IsNotEmpty()
  permission: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID('4')
  userId?: string;

  @ApiPropertyOptional({ enum: ScopeType })
  @IsOptional()
  scopeType?: ScopeType;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID('4')
  scopeId?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  resourceType?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  resourceId?: string;
}

export class BulkCheckPermissionDto {
  @ApiProperty({ type: [String] })
  @IsArray() @IsString({ each: true })
  permissions: string[];

  @ApiPropertyOptional()
  @IsOptional() @IsUUID('4')
  userId?: string;
}

export class AuthorizationCheckResponseDto {
  @ApiProperty() allowed: boolean;
  @ApiProperty() userId: string;
  @ApiProperty() permission: string;
  @ApiProperty({ type: [String] }) matchedRoles: string[];
  @ApiPropertyOptional() reason?: string;
}

export class EffectivePermissionsResponseDto {
  @ApiProperty() userId: string;
  @ApiProperty({ type: [String] }) roles: string[];
  @ApiProperty({ type: [String] }) permissions: string[];
  @ApiProperty() computedAt: string;
}
