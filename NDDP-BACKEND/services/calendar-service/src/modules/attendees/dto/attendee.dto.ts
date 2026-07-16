import { IsUUID, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RsvpStatus } from '../../../common/enums';

export class InviteAttendeeDto {
  @ApiProperty() @IsUUID() userId: string;
}

export class RespondRsvpDto {
  @ApiProperty({ enum: RsvpStatus }) @IsEnum(RsvpStatus) rsvpStatus: RsvpStatus;
}
