import { IsString, IsEnum, IsOptional, MaxLength, IsArray, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChannelType, MemberRole } from '../../../common/enums';

export class CreateChannelDto {
  @ApiProperty() @IsString() @MaxLength(50) code: string;
  @ApiProperty() @IsString() @MaxLength(200) name: string;
  @ApiProperty({ enum: ChannelType }) @IsEnum(ChannelType) channelType: ChannelType;
  @ApiPropertyOptional() @IsOptional() @IsString() description?: string;
  @ApiPropertyOptional({ type: [String] }) @IsOptional() @IsArray() @IsUUID('4', { each: true }) memberIds?: string[];
}

export class AddChannelMemberDto {
  @ApiProperty() @IsUUID() userId: string;
  @ApiPropertyOptional({ enum: MemberRole }) @IsOptional() @IsEnum(MemberRole) role?: MemberRole;
}
