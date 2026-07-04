import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum, IsUUID, IsDateString,
  MaxLength, MinLength, IsBoolean, IsObject,
} from 'class-validator';
import { UserStatus, Gender, AddressType } from '../../../common/enums';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'EMP-2026-00001' })
  @IsString() @IsNotEmpty() @MaxLength(50)
  employeeNumber: string;

  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100)
  firstName: string;

  @ApiProperty() @IsString() @IsNotEmpty() @MaxLength(100)
  lastName: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(100)
  middleName?: string;

  @ApiProperty({ example: 'john.doe@defence.gov' })
  @IsEmail() @MaxLength(255)
  email: string;

  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30)
  phone?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ enum: Gender }) @IsOptional() @IsEnum(Gender)
  gender?: Gender;

  @ApiPropertyOptional() @IsOptional() @IsString()
  nationality?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  rank?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  jobTitle?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID('4')
  departmentId?: string;

  @ApiPropertyOptional() @IsOptional() @IsUUID('4')
  supervisorId?: string;

  @ApiPropertyOptional() @IsOptional() @IsDateString()
  hireDate?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ enum: UserStatus }) @IsOptional() @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional() @IsOptional() @IsString()
  profilePhotoUrl?: string;

  @ApiPropertyOptional() @IsOptional() @IsObject()
  metadata?: Record<string, unknown>;
}

export class UserFilterDto extends PaginationDto {
  @ApiPropertyOptional() @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: UserStatus }) @IsOptional() @IsEnum(UserStatus)
  status?: UserStatus;

  @ApiPropertyOptional() @IsOptional() @IsUUID('4')
  departmentId?: string;
}

export class CreateAddressDto {
  @ApiProperty({ enum: AddressType }) @IsEnum(AddressType)
  type: AddressType;

  @ApiProperty() @IsString() @IsNotEmpty()
  addressLine1: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  addressLine2?: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  city: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  state?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  postalCode?: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  country: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isPrimary?: boolean;
}

export class CreateEmergencyContactDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  fullName: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  relationship?: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional() @IsOptional() @IsEmail()
  email?: string;

  @ApiPropertyOptional() @IsOptional() @IsBoolean()
  isPrimary?: boolean;
}

export class UserResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() employeeNumber: string;
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() email: string;
  @ApiProperty() status: string;
  @ApiProperty() hasCredentials: boolean;
  @ApiProperty() createdAt: Date;
}
