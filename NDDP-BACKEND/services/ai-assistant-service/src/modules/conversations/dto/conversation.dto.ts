import { IsUUID, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty() @IsUUID() agentId: string;
  @ApiPropertyOptional() @IsOptional() @IsString() title?: string;
}
