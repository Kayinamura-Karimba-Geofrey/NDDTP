import { IsUUID, IsString, IsNotEmpty, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MessageRole } from '../../../common/enums';

export class SendMessageDto {
  @ApiProperty() @IsUUID() conversationId: string;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
}

export class CompleteMessageDto {
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiPropertyOptional() @IsOptional() @IsInt() @Min(0) tokenCount?: number;
}

export class FailMessageDto {
  @ApiPropertyOptional() @IsOptional() @IsString() errorMessage?: string;
}

export class CreateAssistantMessageDto {
  @ApiProperty() @IsUUID() conversationId: string;
}
