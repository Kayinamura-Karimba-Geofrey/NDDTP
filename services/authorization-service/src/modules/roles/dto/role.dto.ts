import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, IsInt, Min, MaxLength, Matches } from 'class-validator';
import { RoleStatus } from '../../../common/enums';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateRoleDto {
  @ApiProperty({ example: 'DEPARTMENT_HEAD' })
  @IsString() @IsNotEmpty() @MaxLength(100)
  @Matches(/^[A-Z][A-Z0-9_]*$/, { message: 'Code must be uppercase with underscores' })
  code: string;

  @ApiProperty({ example: 'Department Head' })
  @IsString() @IsNotEmpty() @MaxLength(255)
  name: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsUUID('4')
  parentRoleId?: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional() @IsInt() @Min(0)
  priority?: number;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @ApiPropertyOptional({ enum: RoleStatus })
  @IsOptional() @IsEnum(RoleStatus)
  status?: RoleStatus;
}

export class RoleFilterDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: RoleStatus })
  @IsOptional() @IsEnum(RoleStatus)
  status?: RoleStatus;
}

export class GrantPermissionsDto {
  @ApiProperty({ type: [String] })
  @IsUUID('4', { each: true })
  permissionIds: string[];
}

export class RoleResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() code: string;
  @ApiProperty() name: string;
  @ApiPropertyOptional() description: string | null;
  @ApiPropertyOptional() parentRoleId: string | null;
  @ApiProperty() isSystem: boolean;
  @ApiProperty() status: string;
  @ApiProperty() priority: number;
  @ApiProperty() createdAt: Date;
}
