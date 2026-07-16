import { IsString, IsEnum, IsOptional, MaxLength, IsUUID, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AnnouncementPriority, AudienceType, AnnouncementStatus } from '../../../common/enums';

export class AudienceEntryDto {
  @ApiProperty() @IsString() audienceType: string;
  @ApiProperty() @IsString() audienceRef: string;
}

export class CreateAnnouncementDto {
  @ApiProperty() @IsUUID() categoryId: string;
  @ApiProperty() @IsString() @MaxLength(300) title: string;
  @ApiProperty() @IsString() content: string;
  @ApiPropertyOptional({ enum: AnnouncementPriority }) @IsOptional() @IsEnum(AnnouncementPriority) priority?: AnnouncementPriority;
  @ApiPropertyOptional({ enum: AudienceType }) @IsOptional() @IsEnum(AudienceType) audienceType?: AudienceType;
  @ApiPropertyOptional() @IsOptional() @IsString() audienceRef?: string;
  @ApiPropertyOptional() @IsOptional() @IsDateString() expiresAt?: string;
  @ApiPropertyOptional({ type: [AudienceEntryDto] })
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => AudienceEntryDto)
  audiences?: AudienceEntryDto[];
}

export class AnnouncementFilterDto {
  @ApiPropertyOptional({ enum: AnnouncementStatus }) @IsOptional() @IsEnum(AnnouncementStatus) status?: AnnouncementStatus;
  @ApiPropertyOptional() @IsOptional() @IsUUID() categoryId?: string;
}
