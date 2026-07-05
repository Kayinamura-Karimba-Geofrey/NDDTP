import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsBoolean, IsUUID, IsEmail } from 'class-validator';
import { NotificationChannel, TemplateStatus } from '../../../common/enums';
import { PaginationDto } from '@nddtp/platform-core';

export class CreateTemplateDto {
  @ApiProperty({ example: 'CUSTOM_ALERT' })
  @IsString() @IsNotEmpty()
  code: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  name: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  description?: string;

  @ApiProperty({ enum: NotificationChannel })
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @ApiPropertyOptional() @IsOptional() @IsString()
  subject?: string;

  @ApiProperty({ example: 'Hello {{firstName}}, your request {{requestId}} is approved.' })
  @IsString() @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional() @IsArray() @IsString({ each: true })
  variables?: string[];
}

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {
  @ApiPropertyOptional({ enum: TemplateStatus })
  @IsOptional() @IsEnum(TemplateStatus)
  status?: TemplateStatus;
}

export class TemplateFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: NotificationChannel })
  @IsOptional() @IsEnum(NotificationChannel)
  channel?: NotificationChannel;
}

export class SendNotificationDto {
  @ApiProperty() @IsUUID('4')
  userId: string;

  @ApiProperty({ example: 'PASSWORD_RESET' })
  @IsString() @IsNotEmpty()
  templateCode: string;

  @ApiProperty({ enum: NotificationChannel })
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @ApiPropertyOptional() @IsOptional() @IsEmail()
  recipientEmail?: string;

  @ApiPropertyOptional() @IsOptional() @IsString()
  recipientPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  variables?: Record<string, string>;
}

export class NotificationFilterDto extends PaginationDto {
  @ApiPropertyOptional({ enum: NotificationChannel })
  @IsOptional() @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean()
  unreadOnly?: boolean;
}

export class UpdatePreferenceDto {
  @ApiProperty() @IsString()
  notificationType: string;

  @ApiProperty({ enum: NotificationChannel })
  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @ApiProperty() @IsBoolean()
  isEnabled: boolean;
}
