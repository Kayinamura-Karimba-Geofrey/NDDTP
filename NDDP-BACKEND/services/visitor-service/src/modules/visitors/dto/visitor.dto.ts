import { IsString, IsEnum, IsOptional, MaxLength, IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IdDocumentType } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';
import { VisitorStatus } from '../../../common/enums';

export class RegisterVisitorDto {
  @ApiProperty() @IsString() @MaxLength(50) idNumber: string;
  @ApiProperty() @IsString() @MaxLength(100) firstName: string;
  @ApiProperty() @IsString() @MaxLength(100) lastName: string;
  @ApiProperty({ enum: IdDocumentType }) @IsEnum(IdDocumentType) idDocumentType: IdDocumentType;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(200) organization?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() @MaxLength(30) phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsEmail() email?: string;
}

export class VisitorFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: VisitorStatus }) @IsOptional() @IsEnum(VisitorStatus) status?: VisitorStatus;
}
