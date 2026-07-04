import { IsString, IsNotEmpty, IsOptional, IsEnum, IsEmail, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { ApplicationStatus } from '../../../common/enums';

export class SubmitApplicationDto {
  @ApiProperty() @IsString() @IsNotEmpty() firstName: string;
  @ApiProperty() @IsString() @IsNotEmpty() lastName: string;
  @ApiProperty() @IsEmail() email: string;
  @ApiPropertyOptional() @IsOptional() @IsString() phone?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() nationalId?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() resumeUrl?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() coverLetter?: string;
}

export class UpdateApplicationStatusDto {
  @ApiProperty({ enum: ApplicationStatus }) @IsEnum(ApplicationStatus) status: ApplicationStatus;
  @ApiPropertyOptional() @IsOptional() @IsString() notes?: string;
  @ApiPropertyOptional() @IsOptional() @IsString() rejectionReason?: string;
}

export class ApplicationFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ApplicationStatus }) @IsOptional() @IsEnum(ApplicationStatus) status?: ApplicationStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() jobPostingId?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() candidateId?: string;
}
