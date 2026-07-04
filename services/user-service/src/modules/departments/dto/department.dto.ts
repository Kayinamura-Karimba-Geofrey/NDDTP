import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsUUID, MaxLength } from 'class-validator';
import { DepartmentType, DepartmentStatus } from '../../../common/enums';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'HR-001' })
  @IsString() @IsNotEmpty() @MaxLength(50)
  code: string;

  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(255)
  name: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: DepartmentType }) @IsOptional() @IsEnum(DepartmentType)
  type?: DepartmentType;

  @ApiPropertyOptional() @IsOptional() @IsUUID('4')
  parentId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID('4')
  headUserId?: string;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @ApiPropertyOptional({ enum: DepartmentStatus }) @IsOptional() @IsEnum(DepartmentStatus)
  status?: DepartmentStatus;
}

export class DepartmentFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: DepartmentStatus }) @IsOptional() @IsEnum(DepartmentStatus)
  status?: DepartmentStatus;
}
