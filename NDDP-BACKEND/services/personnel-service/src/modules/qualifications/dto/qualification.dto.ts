import { IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QualificationCategory } from '../../../common/enums';

export class CreateQualificationDto {
  @ApiProperty() @IsString() @IsNotEmpty() code: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty({ enum: QualificationCategory }) @IsEnum(QualificationCategory) category: QualificationCategory;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() validityMonths?: number;
}

export class AddPersonnelQualificationDto {
  @ApiProperty() @IsUUID() qualificationId: string;
  @ApiProperty() @IsDateString() obtainedDate: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expiryDate?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() certificationNumber?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() issuingAuthority?: string;
}
