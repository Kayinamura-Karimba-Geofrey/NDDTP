import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { ScopeType } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class AssignRoleDto {
  @ApiProperty()
  @IsUUID('4')
  userId: string;

  @ApiProperty()
  @IsUUID('4')
  roleId: string;

  @ApiPropertyOptional({ enum: ScopeType, default: ScopeType.GLOBAL })
  @IsOptional() @IsEnum(ScopeType)
  scopeType?: ScopeType;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID('4')
  scopeId?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  expiresAt?: string;
}

export class RevokeRoleDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  reason?: string;
}

export class AssignmentFilterDto extends PaginationDto {}

export class AssignmentResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() roleCode: string;
  @ApiProperty() roleName: string;
  @ApiProperty() scopeType: string;
  @ApiProperty() status: string;
  @ApiProperty() assignedAt: Date;
  @ApiPropertyOptional() expiresAt: Date | null;
}
