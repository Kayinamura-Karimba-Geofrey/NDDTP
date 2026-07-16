import { IsString, IsEnum, IsOptional, IsObject, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageType } from '../../../common/enums';

export class SendMessageDto {
  @ApiProperty() @IsUUID() channelId: string;
  @ApiProperty() @IsString() content: string;
  @ApiPropertyOptional({ enum: MessageType }) @IsOptional() @IsEnum(MessageType) messageType?: MessageType;
  @ApiPropertyOptional() @IsOptional() @IsObject() metadata?: Record<string, unknown>;
}

export class MarkDeliveredDto {
  @ApiProperty() @IsUUID() recipientId: string;
}

export class MarkReadDto {
  @ApiProperty() @IsUUID() recipientId: string;
}
