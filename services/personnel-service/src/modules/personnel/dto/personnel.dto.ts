import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, IsEmail, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '@nddtp/platform-core';
import { PersonnelType, ServiceStatus, ServiceBranch } from '../../../common/enums';

export class CreatePersonnelRecordDto {
  @ApiProperty()
  @IsUUID() @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  serviceNumber: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  employeeNumber?: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional() @IsEmail()
  email?: string;

  @ApiPropertyOptional({ enum: PersonnelType })
  @IsOptional() @IsEnum(PersonnelType)
  personnelType?: PersonnelType;

  @ApiPropertyOptional({ enum: ServiceBranch })
  @IsOptional() @IsEnum(ServiceBranch)
  branch?: ServiceBranch;

  @ApiPropertyOptional()
  @IsOptional() @IsDateString()
  enlistmentDate?: string;
}

export class UpdatePersonnelRecordDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsEmail()
  email?: string;

  @ApiPropertyOptional({ enum: PersonnelType })
  @IsOptional() @IsEnum(PersonnelType)
  personnelType?: PersonnelType;

  @ApiPropertyOptional({ enum: ServiceStatus })
  @IsOptional() @IsEnum(ServiceStatus)
  serviceStatus?: ServiceStatus;

  @ApiPropertyOptional({ enum: ServiceBranch })
  @IsOptional() @IsEnum(ServiceBranch)
  branch?: ServiceBranch;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  bloodGroup?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  maritalStatus?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  nationalId?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  securityClearance?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  notes?: string;
}

export class PersonnelFilterDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ServiceStatus })
  @IsOptional() @IsEnum(ServiceStatus)
  serviceStatus?: ServiceStatus;

  @ApiPropertyOptional({ enum: PersonnelType })
  @IsOptional() @IsEnum(PersonnelType)
  personnelType?: PersonnelType;

  @ApiPropertyOptional({ enum: ServiceBranch })
  @IsOptional() @IsEnum(ServiceBranch)
  branch?: ServiceBranch;
}

export class CreateServiceHistoryDto {
  @ApiProperty({ enum: ['ENLISTMENT','PROMOTION','DEMOTION','TRANSFER','DEPLOYMENT','SEPARATION','AWARD','DISCIPLINARY','TRAINING'] })
  @IsString() @IsNotEmpty()
  eventType: string;

  @ApiProperty()
  @IsString() @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  description?: string;

  @ApiProperty()
  @IsDateString()
  eventDate: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  referenceNumber?: string;
}
